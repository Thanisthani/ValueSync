import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CurrencySelector from './screens/CurrencySelector';
import { ThemeProvider } from './context/ThemeContext';
import SplashScreen from 'react-native-splash-screen';
import remoteConfig from '@react-native-firebase/remote-config';

type RootStackParamList = {
  Home: undefined;
  CurrencySelector: {
    type: 'from' | 'to';
    currentCurrency: string;
    onSelect: (currency: string) => void;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  useEffect(() => {
    // Hide splash screen after app is ready
    SplashScreen.hide();
  }, []);


  useEffect(() => {
  
    remoteConfig()
    .setDefaults({
      Tester: 'disabled',
    })
    .then(() => remoteConfig().fetchAndActivate())
    .then(fetchedRemotely => {
      if (fetchedRemotely) {
        console.log('Configs were retrieved from the backend and activated.');
      } else {
        console.log(
          'No configs were fetched from the backend, and the local configs were already activated',
        );
      }
    });

  }, []);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CurrencySelector" component={CurrencySelector} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App; 