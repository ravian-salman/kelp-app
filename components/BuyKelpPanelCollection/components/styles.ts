import { StyleSheet } from 'react-native';
import { responsiveScale } from '../../../constants/Layout';

export const AddKelpStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingText: {
    textAlign: 'center',
  },
  space: {
    width: '100%',
    height: '2%',
  },
  txtAmountValue: {
    width: '80%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '20%',
  },
  valueContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  valuePrimaryWrapper: {
    // paddingBottom: '4%',
    flex: 1,
    flexDirection: 'row',
  },
  valuePrimaryText: {
    fontSize: responsiveScale(40),
    textAlign: 'center',
  },
  bnbText: {
    fontSize: responsiveScale(20),
    textAlign: 'center',
  },
  valuePrimaryIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valuePrimaryIcon: {
    height: 30,
    width: 30,
  },
  bnbBalanceView: { width: '100%', flex: 0.7 },
  valueSecondaryText: { fontSize: responsiveScale(7), textAlign: 'center' },
  additionalInteractionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '3%',
  },
  interactionText: {
    fontSize: responsiveScale(15),
    flex: 1,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
});

export const PaymentMethodStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingText: {
    fontSize: 24,
    textAlign: 'center',
  },
  methodContainer: {
    marginTop: 62,
    paddingHorizontal: 25,
    width: '100%',
    flex: 1,
  },
  cardContainer: {
    width: '100%',
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  iconContainer: {
    backgroundColor: 'transparent',
    marginRight: 25,
  },
  methodTitleWrapper: {
    alignItems: 'flex-start',
    backgroundColor: 'white',
    flex: 1,
  },
  methodTitle: {
    fontSize: 35,
    marginTop: -5,
  },
  txtUsdView: {
    width: 70,
    height: 30,
    borderRadius: 5,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#46D6A2',
  },
  txtYouPay: {
    fontSize: 13,
    marginTop: 17,
  },
  txtUsd: { color: 'white', fontSize: 20 },
  secondaryInfoContainer: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: 'white',
  },
  viewPaymentProcess: { width: '100%', flex: 1 },
  secondaryInfoWrapper: {
    alignItems: 'flex-end',
    backgroundColor: 'white',
  },
});
