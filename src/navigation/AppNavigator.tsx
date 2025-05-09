import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import CurrencySelector from '../screens/CurrencySelector';

type RootStackParamList = {
  MainTabs: undefined;
  CurrencySelector: {
    type: 'from' | 'to';
    currentCurrency: string;
    onSelect: (currency: string) => void;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="CurrencySelector" component={CurrencySelector} />
    </Stack.Navigator>
  );
};

export default AppNavigator; 