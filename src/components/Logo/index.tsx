import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  const { colors } = useTheme();

  const getSize = () => {
    switch (size) {
      case 'small':
        return { container: 40, text: 16, icon: 20 };
      case 'large':
        return { container: 80, text: 32, icon: 40 };
      default:
        return { container: 60, text: 24, icon: 30 };
    }
  };

  const { container, text, icon } = getSize();

  return (
    <View style={[styles.container, { height: container }]}>
      <View style={[styles.iconContainer, { 
        width: icon, 
        height: icon,
        backgroundColor: colors.primary,
        shadowColor: colors.primary,
      }]}>
        <Text style={[styles.icon, { fontSize: icon * 0.6 }]}>$</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.text, { 
          fontSize: text,
          color: colors.text,
          fontWeight: 'bold'
        }]}>
          Value<Text style={[styles.highlight, { 
            color: colors.primary,
            fontWeight: 'bold'
          }]}>Sync</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
  highlight: {
    fontWeight: 'bold',
  },
});

export default Logo; 