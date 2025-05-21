/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';
import { getApp } from '@react-native-firebase/app';
import { fetchAndActivate, getRemoteConfig, getValue, onConfigUpdated } from '@react-native-firebase/remote-config';
import remoteConfig from '@react-native-firebase/remote-config';
import WebViewOverlay from './src/components/WebViewOverlay';

const AppContent = () => {
  const { colors, isDark } = useTheme();

  return (
    <NavigationContainer
      theme={{
        dark: isDark,
        colors: {
          primary: colors.primary,
          background: colors.background,
          card: colors.card,
          text: colors.text,
          border: colors.border,
          notification: colors.notification,
        },
        fonts: {
          regular: {
            fontFamily: 'System',
            fontWeight: '400',
          },
          medium: {
            fontFamily: 'System',
            fontWeight: '500',
          },
          bold: {
            fontFamily: 'System',
            fontWeight: '700',
          },
          heavy: {
            fontFamily: 'System',
            fontWeight: '900',
          },
        },
      }}
    >
      <AppNavigator />
    </NavigationContainer>
  );
};

const App = () => {
  const DEFAULT_URL = '';
  const [webViewUrl, setWebViewUrl] = useState<string>(DEFAULT_URL);
  const [showWebView, setShowWebView] = useState(false);

  const remoteConfigInstance = getRemoteConfig(getApp());
  remoteConfigInstance.setConfigSettings({
    minimumFetchIntervalMillis: 0,
  });

   // Function to update WebView state
   const updateWebViewState = () => {
    try {
      // const urlConfig = getValue(remoteConfigInstance, 'url');
      // const configString = urlConfig.asString();
      // console.log('RemoteConfigProvider: Raw config:', configString);
      
      // const parsedConfig = JSON.parse(configString);
      // console.log('RemoteConfigProvider: Parsed config:', parsedConfig);

      // // Use the URL from remote config if available, otherwise use default
      // const url = parsedConfig?.value || DEFAULT_URL;
      // console.log('RemoteConfigProvider: Using URL:', url);
      
    
      fetchAndActivate(remoteConfigInstance)
      .then(fetchedRemotely => {
        console.log('Remote Config fetched:', fetchedRemotely);
        const urlConfig = getValue(remoteConfigInstance, 'url');
        const configString = urlConfig.asString();
        console.log('Remote Config URL value app tsx:', configString);
        
        try {
          const parsedConfig = JSON.parse(configString);
          console.log('Parsed config:', parsedConfig);
          if (!parsedConfig.value) {
            console.log('No URL value found, using default');
            setShowWebView(false);
          }else{
            setWebViewUrl(parsedConfig.value);
            setShowWebView(true);
          }
        } catch (error) {
          console.error('Error parsing config:', error);
        }
      })
      .catch(error => {
        console.error('Remote Config fetch error:', error);
      });
    } catch (error) {
      console.error('RemoteConfigProvider: Error updating state:', error);
      // Use default URL if there's an error
      setWebViewUrl(DEFAULT_URL);
      setShowWebView(true);
    }
  };

  useEffect(() => {
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

  return (
    <ThemeProvider>
       {showWebView && webViewUrl ? (
        <WebViewOverlay
          url={webViewUrl}
          onClose={() => {
            console.log('AppContent: WebView closed by user');
            setShowWebView(false);
          }}
        />
      ):( <AppContent />)}
     
    </ThemeProvider>
  );
};

export default App;
