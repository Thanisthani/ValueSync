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


  console.log('=== FIREBASE INIT END ===');
} catch (error) {
  console.error('Firebase initialization error:', error);
}

AppRegistry.registerComponent(appName, () => App);
