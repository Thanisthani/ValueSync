import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { getCurrencyName } from '../../util/currencyNames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';
import { styles } from './styles';

interface Currency {
  code: string;
  name: string;
}

interface CurrencySelectorProps {
  navigation: any;
  route: {
    params: {
      type: 'from' | 'to';
      currentCurrency: string;
      onSelect: (currency: string) => void;
    };
  };
}

const STORAGE_KEY = '@currency_converter_data';

const CurrencySelector = ({ navigation, route }: CurrencySelectorProps) => {
  const { colors, isDark } = useTheme();
  const { type, currentCurrency, onSelect } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const data = JSON.parse(storedData);
        const currencyList = Object.keys(data.rates).map(code => ({
          code,
          name: getCurrencyName(code),
        }));
        setCurrencies(currencyList);
      } else {
        setError('No currency data available');
      }
    } catch (err) {
      console.error('Error loading stored data:', err);
      setError('Failed to load currencies');
    } finally {
      setLoading(false);
    }
  };

  // Filter currencies based on search query
  const filteredCurrencies = useMemo(() => {
    if (!searchQuery) return currencies;
    
    const query = searchQuery.toLowerCase();
    return currencies.filter(
      currency =>
        currency.code.toLowerCase().includes(query) ||
        currency.name.toLowerCase().includes(query)
    );
  }, [currencies, searchQuery]);

  const handleSelect = (currency: Currency) => {
    onSelect(currency.code);
    navigation.goBack();
  };

  const renderItem = ({ item }: { item: Currency }) => (
    <TouchableOpacity
      style={[
        styles.currencyItem,
        { backgroundColor: colors.card },
        item.code === currentCurrency && { borderColor: colors.primary }
      ]}
      onPress={() => handleSelect(item)}
    >
      <Text style={[styles.currencyCode, { color: colors.text }]}>{item.code}</Text>
      <Text style={[styles.currencyName, { color: colors.text + '80' }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
        animated={true}
        translucent={false}
      />
      <View style={[styles.headerContainer, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>
            Select {type === 'from' ? 'From' : 'To'} Currency
          </Text>
        </View>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <Icon name="search" size={20} color={colors.text + '80'} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search currency"
          placeholderTextColor={colors.text + '80'}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery ? (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setSearchQuery('')}
          >
            <Icon name="close-circle" size={20} color={colors.text + '80'} />
          </TouchableOpacity>
        ) : null}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.text }]}>{error}</Text>
          <TouchableOpacity 
            style={[styles.retryButton, { backgroundColor: colors.primary }]} 
            onPress={loadStoredData}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredCurrencies}
          renderItem={renderItem}
          keyExtractor={(item) => item.code}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          windowSize={10}
        />
      )}
    </SafeAreaView>
  );
};

export default CurrencySelector; 