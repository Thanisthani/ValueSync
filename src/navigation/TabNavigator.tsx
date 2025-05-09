import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../context/ThemeContext';
import HomeScreen from '../screens/HomeScreen';
import UnitConverter from '../screens/UnitConverter';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { colors, isDark } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          height: wp('18%'),
          paddingBottom: wp('2%'),
          paddingTop: wp('2%'),
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: {
          fontSize: wp('3%'),
          fontWeight: '500',
        },
        tabBarHideOnKeyboard: true
      }}
      
    >
      <Tab.Screen
        name="Currency"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="cash-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Unit"
        component={UnitConverter}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="scale-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator; 