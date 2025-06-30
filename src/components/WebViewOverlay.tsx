import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';

interface WebViewOverlayProps {
  url: string;
  onClose: () => void;
}

const WebViewOverlay: React.FC<WebViewOverlayProps> = ({ url, onClose }) => {
  const { colors } = useTheme();

  useEffect(() => {
    console.log('WebViewOverlay: Component mounted with URL:', url);
    return () => {
      console.log('WebViewOverlay: Component unmounting');
    };
  }, [url]);

  console.log('WebViewOverlay: Rendering with URL:', url);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => {
            console.log('WebViewOverlay: Close button pressed');
            onClose();
          }} 
          style={styles.closeButton}
        >
          <Icon name="close" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      <WebView
        source={{ uri: url }}
        style={styles.webview}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoadStart={() => console.log('WebViewOverlay: Loading started')}
        onLoadEnd={() => console.log('WebViewOverlay: Loading ended')}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebViewOverlay: Error loading URL:', nativeEvent);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    elevation: 5, // Add elevation for Android
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background
  },
  closeButton: {
    padding: 8,
  },
  webview: {
    flex: 1,
  },
});

export default WebViewOverlay; 