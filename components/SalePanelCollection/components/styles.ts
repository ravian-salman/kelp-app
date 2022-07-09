import { StyleSheet } from 'react-native';

export const PrivateSaleDashboardStyles = StyleSheet.create({
  cardContainer: {
    height: '100%',
    position: 'relative',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headingContainer: {
    width: '100%',
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 6,
  },
  headingMainText: {
    fontSize: 25,
  },
  headingSecondaryText: { fontSize: 14 },
  progressBarContainer: { width: '100%', paddingHorizontal: 25 },
  softCapContainer: { alignItems: 'flex-start', marginTop: 25 },
  progressBarText: { fontSize: 12 },
  hardCapCOntainer: { alignItems: 'flex-end' },
  progressBarTextWrapper: { alignItems: 'center', transform: [{ translateY: -20 }] },
  progressBarPrimaryAmount: { fontSize: 36 },
  progressBarSecondaryAmount: { fontSize: 16 },
  progressBarAmountSymbol: { fontSize: 20, marginRight: 4, alignSelf: 'flex-start' },
  totalRaisedContainer: {
    marginTop: 28,
    marginBottom: 12,
  },
  valueWrapper: {
    flexDirection: 'row',
  },
  currencyIcon: {
    fontSize: 24,
    marginRight: 6,
  },
  iconContainer: {
    width: 50,
    aspectRatio: 1,
    marginRight: 13,
  },
  currencyTitlePrimary: {
    fontSize: 20,
    color: '#000',
  },
  currencyTitleSecondary: {
    fontSize: 12,
    color: '#CDCECE',
  },
  cardLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardRightContent: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  tokenCardContainer: {
    width: '100%',
    paddingHorizontal: 25,
  },
  tokenCardWrapper: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 10,
  },
  bnbContainer: {
    marginTop: 28,
    marginBottom: 12,
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingBottom: 25,
    paddingHorizontal: 25,
  },
  button: {
    flex: 1,
  },
});

export const PublicSaleDashboardStyles = StyleSheet.create({
  cardContainer: {
    position: 'relative',
    minHeight: '100%',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headingSecondaryText: { fontSize: 14 },
  headingContainer: {
    width: '100%',
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 6,
  },
  iconWrapper: {
    height: 34,
    width: 34,
    borderRadius: 17,
  },
  headingMainText: {
    fontSize: 25,
  },
  infoCardContainer: {
    width: '100%',
    paddingHorizontal: 25,
  },
  infoCardWrapper: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 25,
  },
  infoCardNumber: {
    fontSize: 50,
    lineHeight: 60,
  },
  infoCardText: {
    fontSize: 12,
    lineHeight: 18,
  },
  descriptionContainer: {
    marginTop: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  descriptionHeading: {
    fontSize: 25,
  },
  description: {
    fontSize: 16,
    color: '#7b7d7c',
    textAlign: 'center',
  },
  checklistContainer: {
    marginTop: 40,
    marginBottom: 25,
    width: '100%',
  },
  checklistItemWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  checklistItemIcon: {
    height: 40,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checklistItemTitleContainer: { justifyContent: 'center', flex: 1 },
  checklistItemTitle: { fontSize: 16, textAlign: 'center' },
  checklistItemPointsContainer: {
    height: 40,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checklistItemPoints: { color: '#fff', fontSize: 20 },
});
