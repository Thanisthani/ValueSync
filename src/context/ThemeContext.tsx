import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

type ThemeContextType = {
  isDark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  colors: {
    primary: '#4A90E2',
    background: '#FFFFFF',
    card: '#F5F5F5',
    text: '#000000',
    border: '#E0E0E0',
    notification: '#FF3B30',
  },
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const lightColors = {
  primary: '#4A90E2',
  background: '#FFFFFF',
  card: '#F5F5F5',
  text: '#000000',
  border: '#E0E0E0',
  notification: '#FF3B30',
};

const darkColors = {
  primary: '#4A90E2',
  background: '#1A1F2E',
  card: '#2A2F3E',
  text: '#FFFFFF',
  border: '#3A3F4E',
  notification: '#FF453A',
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDark, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 