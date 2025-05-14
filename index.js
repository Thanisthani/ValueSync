/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { getApps, initializeApp, getApp } from '@react-native-firebase/app';
import { getRemoteConfig, fetchAndActivate, getValue } from '@react-native-firebase/remote-config';

// Initialize Firebase
try {
  console.log('=== FIREBASE INIT START ===');
  if (getApps().length === 0) {
    console.log('No Firebase apps found, initializing...');
    initializeApp();
    console.log('Firebase initialized successfully');
  } else {
    console.log('Firebase already initialized');
  }

  // Initialize Remote Config
  console.log('Initializing Remote Config...');
  const remoteConfigInstance = getRemoteConfig(getApp());
  
  // Set minimum fetch interval to 0 for testing
  remoteConfigInstance.setConfigSettings({
    minimumFetchIntervalMillis: 0,
  });

  // Set default value
  const defaultConfig = {
    url: JSON.stringify({
      key: 'url',
      value: ''
    })
  };
  
  console.log('Setting default config:', defaultConfig);
  remoteConfigInstance.setDefaults(defaultConfig);

  // Fetch and activate
  console.log('Fetching remote config...');
  fetchAndActivate(remoteConfigInstance)
    .then(fetchedRemotely => {
      console.log('Remote Config fetched:', fetchedRemotely);
      const urlConfig = getValue(remoteConfigInstance, 'url');
      const configString = urlConfig.asString();
      console.log('Remote Config URL value:', configString);
      
      try {
        const parsedConfig = JSON.parse(configString);
        console.log('Parsed config:', parsedConfig);
        if (!parsedConfig.value) {
          console.log('No URL value found, using default');
          // Force update with default value
          remoteConfigInstance.setDefaults(defaultConfig);
        }
      } catch (error) {
        console.error('Error parsing config:', error);
      }
    })
    .catch(error => {
      console.error('Remote Config fetch error:', error);
    });

  console.log('=== FIREBASE INIT END ===');
} catch (error) {
  console.error('Firebase initialization error:', error);
}

AppRegistry.registerComponent(appName, () => App);
