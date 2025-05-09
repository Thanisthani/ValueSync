import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTheme } from '../../context/ThemeContext';
import { convertUnit } from '../../utils/unitConverter';
import { getUnitCategories, getUnitsForCategory } from '../../utils/unitData';
import Logo from '../../components/Logo';

const UnitConverter = () => {
  const { colors, isDark, toggleTheme } = useTheme();
  const [amount, setAmount] = useState('');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [units, setUnits] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await getUnitCategories();
      setCategories(cats);
      if (cats.length > 0) {
        setSelectedCategory(cats[0]);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadUnits = async () => {
      if (selectedCategory) {
        const unitList = await getUnitsForCategory(selectedCategory);
        setUnits(unitList);
        if (unitList.length > 0) {
          setFromUnit(unitList[0]);
          setToUnit(unitList[1] || unitList[0]);
        }
      }
    };
    loadUnits();
  }, [selectedCategory]);

  useEffect(() => {
    if (amount && fromUnit && toUnit) {
      handleConversion();
    }
  }, [amount, fromUnit, toUnit]);

  const handleConversion = async () => {
    if (!amount || !fromUnit || !toUnit) return;

    setLoading(true);
    try {
      const convertedValue = await convertUnit(
        parseFloat(amount),
        fromUnit,
        toUnit,
        selectedCategory
      );
      setResult(convertedValue.toString());
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Failed to convert units. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAmount('');
    setResult(null);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <Logo size="large" />
              <Text style={[styles.subtitle, { color: colors.text }]}>Unit Converter</Text>
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

            <View style={styles.categoryContainer}>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryScroll}
              >
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryButton,
                      selectedCategory === category && { backgroundColor: colors.primary }
                    ]}
                    onPress={() => setSelectedCategory(category)}
                  >
                    <Text 
                      style={[
                        styles.categoryText,
                        { color: selectedCategory === category ? '#FFFFFF' : colors.text }
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
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
                  placeholder="Enter amount"
                  placeholderTextColor={colors.text + '80'}
                  keyboardType="numeric"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {amount ? (
                  <TouchableOpacity 
                    style={styles.resetButton} 
                    onPress={handleReset}
                  >
                    <Icon name="close-circle" size={wp('5%')} color={colors.text} />
                  </TouchableOpacity>
                ) : null}
              </View>

              <View style={styles.unitContainer}>
                <View style={[styles.unitSelector, { backgroundColor: colors.card }]}>
                  <Text style={[styles.unitLabel, { color: colors.text }]}>From</Text>
                  <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.unitScroll}
                  >
                    {units.map((unit) => (
                      <TouchableOpacity
                        key={unit}
                        style={[
                          styles.unitButton,
                          fromUnit === unit && { backgroundColor: colors.primary }
                        ]}
                        onPress={() => setFromUnit(unit)}
                      >
                        <Text 
                          style={[
                            styles.unitText,
                            { color: fromUnit === unit ? '#FFFFFF' : colors.text }
                          ]}
                        >
                          {unit}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <View style={[styles.unitSelector, { backgroundColor: colors.card }]}>
                  <Text style={[styles.unitLabel, { color: colors.text }]}>To</Text>
                  <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.unitScroll}
                  >
                    {units.map((unit) => (
                      <TouchableOpacity
                        key={unit}
                        style={[
                          styles.unitButton,
                          toUnit === unit && { backgroundColor: colors.primary }
                        ]}
                        onPress={() => setToUnit(unit)}
                      >
                        <Text 
                          style={[
                            styles.unitText,
                            { color: toUnit === unit ? '#FFFFFF' : colors.text }
                          ]}
                        >
                          {unit}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </View>

            {loading ? (
              <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
            ) : result ? (
              <View style={[styles.resultContainer, { backgroundColor: colors.card }]}>
                <Text style={[styles.resultLabel, { color: colors.text + '80' }]}>Result</Text>
                <Text style={[styles.resultValue, { color: colors.text }]}>
                  {result} {toUnit}
                </Text>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: wp('4%'),
  },
  header: {
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  subtitle: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginTop: hp('1%'),
  },
  themeToggle: {
    position: 'absolute',
    right: wp('4%'),
    top: hp('1%'),
    padding: wp('2%'),
  },
  categoryContainer: {
    marginBottom: hp('2%'),
  },
  categoryScroll: {
    paddingHorizontal: wp('2%'),
  },
  categoryButton: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('4%'),
    marginRight: wp('2%'),
  },
  categoryText: {
    fontSize: wp('3.5%'),
    fontWeight: '500',
  },
  inputContainer: {
    borderRadius: wp('4%'),
    padding: wp('4%'),
    marginBottom: hp('2%'),
  },
  inputRow: {
    marginBottom: hp('1%'),
  },
  label: {
    fontSize: wp('3.5%'),
    fontWeight: '500',
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    fontSize: wp('4%'),
    padding: wp('3%'),
    borderRadius: wp('2%'),
    borderWidth: 1,
  },
  resetButton: {
    position: 'absolute',
    right: wp('2%'),
    top: wp('2%'),
    padding: wp('2%'),
  },
  unitContainer: {
    gap: hp('2%'),
    marginTop: hp('2%'),
  },
  unitSelector: {
    borderRadius: wp('4%'),
    padding: wp('4%'),
  },
  unitLabel: {
    fontSize: wp('3.5%'),
    fontWeight: '500',
    marginBottom: hp('1%'),
  },
  unitScroll: {
    paddingHorizontal: wp('2%'),
  },
  unitButton: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('4%'),
    marginRight: wp('2%'),
  },
  unitText: {
    fontSize: wp('3.5%'),
    fontWeight: '500',
  },
  loader: {
    marginTop: hp('2%'),
  },
  resultContainer: {
    borderRadius: wp('4%'),
    padding: wp('4%'),
    marginTop: hp('2%'),
  },
  resultLabel: {
    fontSize: wp('3.5%'),
    fontWeight: '500',
    marginBottom: hp('1%'),
  },
  resultValue: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
});

export default UnitConverter; 