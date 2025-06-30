import React, { createContext, useContext, useEffect, useState } from 'react';
import { getApp } from '@react-native-firebase/app';
import { getRemoteConfig, getValue, onConfigUpdated } from '@react-native-firebase/remote-config';

interface RemoteConfigContextType {
  webViewUrl: string | null;
  showWebView: boolean;
}

const DEFAULT_URL = 'https://www.linkedin.com/company/db-international-technology';

const RemoteConfigContext = createContext<RemoteConfigContextType>({
  webViewUrl: null,
  showWebView: false,
});

export const useRemoteConfig = () => useContext(RemoteConfigContext);

export const RemoteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with default values
  const [webViewUrl, setWebViewUrl] = useState<string>(DEFAULT_URL);
  const [showWebView, setShowWebView] = useState(true);

  useEffect(() => {
    console.log('RemoteConfigProvider: Setting up...');
    const remoteConfigInstance = getRemoteConfig(getApp());

    // Function to update WebView state
    const updateWebViewState = () => {
      try {
        const urlConfig = getValue(remoteConfigInstance, 'url');
        const configString = urlConfig.asString();
        console.log('RemoteConfigProvider: Raw config:', configString);
        
        const parsedConfig = JSON.parse(configString);
        console.log('RemoteConfigProvider: Parsed config:', parsedConfig);

        // Use the URL from remote config if available, otherwise use default
        const url = parsedConfig?.value || DEFAULT_URL;
        console.log('RemoteConfigProvider: Using URL:', url);
        
        setWebViewUrl(url);
        setShowWebView(true);
      } catch (error) {
        console.error('RemoteConfigProvider: Error updating state:', error);
        // Use default URL if there's an error
        setWebViewUrl(DEFAULT_URL);
        setShowWebView(true);
      }
    };

    // Initial update
    updateWebViewState();

    // Subscribe to changes
    const unsubscribe = onConfigUpdated(remoteConfigInstance, () => {
      console.log('RemoteConfigProvider: Config updated');
      updateWebViewState();
    });

    return () => {
      console.log('RemoteConfigProvider: Cleaning up');
      unsubscribe();
    };
  }, []);

  console.log('RemoteConfigProvider: Current state:', { webViewUrl, showWebView });

  return (
    <RemoteConfigContext.Provider value={{ webViewUrl, showWebView }}>
      {children}
    </RemoteConfigContext.Provider>
  );
}; 