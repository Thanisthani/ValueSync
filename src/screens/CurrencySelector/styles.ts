import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1C',
  },
  headerContainer: {
    backgroundColor: '#0A0F1C',
    paddingTop: hp('2%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('3%'),
    borderBottomWidth: 1,
    borderBottomColor: '#2A2F3E',
  },
  backButton: {
    padding: wp('2%'),
    marginRight: wp('2%'),
  },
  title: {
    fontSize: RFValue(18),
    color: '#FFFFFF',
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1F2E',
    margin: wp('3%'),
    paddingHorizontal: wp('3%'),
    borderRadius: wp('2%'),
    borderWidth: 1,
    borderColor: '#2A2F3E',
  },
  searchIcon: {
    marginRight: wp('2%'),
  },
  searchInput: {
    flex: 1,
    height: hp('5%'),
    color: '#FFFFFF',
    fontSize: RFValue(14),
  },
  clearButton: {
    padding: wp('1%'),
  },
  listContainer: {
    padding: wp('3%'),
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('3%'),
    backgroundColor: '#1A1F2E',
    borderRadius: wp('2%'),
    marginBottom: hp('1%'),
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedCurrency: {
    backgroundColor: '#2A2F3E',
    borderColor: '#4A90E2',
  },
  currencyCode: {
    fontSize: RFValue(16),
    color: '#FFFFFF',
    fontWeight: '600',
    width: wp('15%'),
  },
  currencyName: {
    fontSize: RFValue(14),
    color: '#FFFFFF',
    opacity: 0.8,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('5%'),
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: RFValue(14),
    textAlign: 'center',
    marginBottom: hp('2%'),
  },
  retryButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('2%'),
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: RFValue(14),
    fontWeight: '600',
  },
}); 