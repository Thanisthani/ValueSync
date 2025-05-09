import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1C'
  },
  content: {
    flex: 1,
    padding: wp('3%'),
    paddingTop: hp('3%'),
  },
  header: {
    alignItems: 'center',
    marginBottom: hp('3%'),
    paddingHorizontal: wp('3%'),
  },
  subtitle: {
    fontSize: RFValue(18),
    color: '#FFFFFF',
    marginTop: hp('1%'),
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.5,
    opacity: 0.9,
  },
  inputContainer: {
    backgroundColor: '#1A1F2E',
    borderRadius: wp('3%'),
    padding: wp('3%'),
    marginBottom: hp('2%'),
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('0.8%'),
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  resetButton: {
    position: 'absolute',
    right: wp('2%'),
    padding: wp('1%'),
  },
  label: {
    fontSize: RFValue(14),
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.3,
    opacity: 0.9,
  },
  input: {
    flex: 1,
    fontSize: RFValue(16),
    color: '#FFFFFF',
    padding: wp('3%'),
    paddingRight: wp('10%'),
    backgroundColor: '#2A2F3E',
    borderRadius: wp('2%'),
    borderWidth: 1,
    borderColor: '#3A3F4E',
    fontWeight: '500',
  },
  pickerContainer: {
    gap: hp('2%'),
    marginTop: hp('2%'),
  },
  pickerWrapper: {
    borderRadius: wp('4%'),
    padding: wp('4%'),
  },
  exchangeButton: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: hp('1%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('1%'),
  },
  currencyText: {
    fontSize: RFValue(14),
    color: '#FFFFFF',
    flex: 1,
  },
  picker: {
    height: hp('7%'),
    color: '#FFFFFF',
    fontSize: RFValue(14),
    backgroundColor: '#1A1F2E',
  },
  pickerItem: {
    backgroundColor: '#1A1F2E',
    color: '#FFFFFF',
  },
  convertButton: {
    backgroundColor: '#4A90E2',
    borderRadius: wp('2%'),
    padding: wp('3%'),
    alignItems: 'center',
    marginTop: hp('1.5%'),
  },
  convertButtonText: {
    color: '#FFFFFF',
    fontSize: RFValue(16),
    fontWeight: '600',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: RFValue(12),
    marginTop: hp('0.8%'),
    textAlign: 'center',
  },
  resultContainer: {
    backgroundColor: '#1A1F2E',
    borderRadius: wp('3%'),
    padding: wp('3%'),
    marginTop: hp('2%'),
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: RFValue(14),
    color: '#FFFFFF',
    opacity: 0.7,
    marginBottom: hp('0.8%'),
  },
  resultAmount: {
    fontSize: RFValue(20),
    color: '#FFFFFF',
    fontWeight: '600',
  },
  updateTime: {
    fontSize: RFValue(12),
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: hp('1.5%'),
    fontWeight: '500',
    opacity: 0.7,
  },
  themeToggle: {
    position: 'absolute',
    right: wp('4%'),
    top: hp('1%'),
    padding: wp('2%'),
  },
}); 