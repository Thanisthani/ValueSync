import { View, Text, SafeAreaView, StatusBar, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import { getCurrencyName } from '../../util/currencyNames';
import Logo from '../../components/Logo';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';

interface Currency {
  code: string;
  name: string;
}

interface ExchangeRateData {
  rates: { [key: string]: number };
  time_next_update_utc: string;
}

const STORAGE_KEY = '@currency_converter_data';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { colors, isDark, toggleTheme } = useTheme();
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextUpdateTime, setNextUpdateTime] = useState<string | null>(null);
  const [rates, setRates] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    loadStoredData();
  }, []);

  useEffect(() => {
    if (amount) {
      convertCurrency();
    } else {
      setConvertedAmount(null);
      setError(null);
    }
  }, [amount, fromCurrency, toCurrency]);

  const loadStoredData = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const data = JSON.parse(storedData);
        setRates(data.rates);

        setNextUpdateTime(data.time_next_update_utc);
        
        if (shouldUpdateRates()) {
          fetchCurrencies();
        }
      } else {
        fetchCurrencies();
      }
    } catch (err) {
      console.error('Error loading stored data:', err);
      fetchCurrencies();
    }
  };

  const fetchCurrencies = async () => {
    try {
      const response = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await response.json();
      if (data.rates) {
      
        setNextUpdateTime(data.time_next_update_utc);

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({
          rates: { USD: 1, ...data.rates },
          time_next_update_utc: data.time_next_update_utc
        }));
      }
    } catch (err) {
      setError('Failed to fetch currencies');
    }
  };

  const shouldUpdateRates = (): boolean => {
    if (!nextUpdateTime) return true;
    
    const nextUpdate = new Date(nextUpdateTime);
    const currentTime = new Date();
    
    return currentTime >= nextUpdate;
  };

  const convertCurrency = () => {
    if (!amount) {
      setConvertedAmount(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (!rates[fromCurrency] || !rates[toCurrency]) {
        throw new Error('Invalid currency conversion');
      }

      // Convert from currency to USD first, then USD to target currency
      const amountInUSD = parseFloat(amount) / rates[fromCurrency];
      const result = amountInUSD * rates[toCurrency];

      setConvertedAmount(result);
    } catch (err) {
      setError('Failed to convert currency. Please try again.');
      setConvertedAmount(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAmount('');
    setConvertedAmount(null);
    setError(null);
  };

  const handleCurrencySelect = (type: 'from' | 'to', currency: string) => {
    if (type === 'from') {
      if (currency === toCurrency) {
        setToCurrency(fromCurrency);
      }
      setFromCurrency(currency);
    } else {
      if (currency === fromCurrency) {
        setFromCurrency(toCurrency);
      }
      setToCurrency(currency);
    }
  };

  const navigateToCurrencySelector = (type: 'from' | 'to') => {
    navigation.navigate('CurrencySelector', {
      type,
      currentCurrency: type === 'from' ? fromCurrency : toCurrency,
      onSelect: (currency: string) => handleCurrencySelect(type, currency),
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
        animated={true}
        translucent={false}
      />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.header}>
          <Logo size="large" />
          <Text style={[styles.subtitle, { color: colors.text }]}>Currency Converter</Text>
          <TouchableOpacity
            style={styles.themeToggle}
            onPress={toggleTheme}
          >
            <Icon 
              name={isDark ? "sunny" : "moon"} 
              size={24} 
              color={colors.text} 
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
          <View style={styles.inputRow}>
            <Text style={[styles.label, { color: colors.text }]}>Amount</Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { 
                color: colors.text,
                backgroundColor: colors.card,
                borderColor: colors.border
              }]}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="Enter amount"
              placeholderTextColor={colors.text + '80'}
            />
            {amount ? (
              <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
                <Icon name="close-circle" size={20} color={colors.text} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        <View style={styles.pickerContainer}>
          <TouchableOpacity
            style={[styles.pickerWrapper, { backgroundColor: colors.card }]}
            onPress={() => navigateToCurrencySelector('from')}
          >
            <Text style={[styles.label, { color: colors.text }]}>From</Text>
            <View style={styles.currencySelector}>
              <Text style={[styles.currencyText, { color: colors.text }]}>
                {fromCurrency} - {getCurrencyName(fromCurrency)}
              </Text>
              <Icon name="chevron-down" size={20} color={colors.text} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.exchangeButton, { backgroundColor: colors.primary }]}
            onPress={() => {
              const temp = fromCurrency;
              setFromCurrency(toCurrency);
              setToCurrency(temp);
            }}
          >
            <Icon name="swap-vertical" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.pickerWrapper, { backgroundColor: colors.card }]}
            onPress={() => navigateToCurrencySelector('to')}
          >
            <Text style={[styles.label, { color: colors.text }]}>To</Text>
            <View style={styles.currencySelector}>
              <Text style={[styles.currencyText, { color: colors.text }]}>
                {toCurrency} - {getCurrencyName(toCurrency)}
              </Text>
              <Icon name="chevron-down" size={20} color={colors.text} />
            </View>
          </TouchableOpacity>
        </View>

        {error ? (
          <Text style={[styles.errorText, { color: colors.notification }]}>{error}</Text>
        ) : null}

        {convertedAmount !== null && !error && (
          <View style={[styles.resultContainer, { backgroundColor: colors.card }]}>
            <Text style={[styles.resultLabel, { color: colors.text + '80' }]}>
              Converted Amount
            </Text>
            <Text style={[styles.resultAmount, { color: colors.text }]}>
              {convertedAmount.toFixed(2)} {toCurrency}
            </Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;
