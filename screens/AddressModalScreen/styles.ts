import { StyleSheet } from 'react-native';

export const AddressModalScreenStyles = StyleSheet.create({
  screenContainer: {
    height: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  screenWrapper: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
    alignItems: 'center',
    paddingBottom: 60,
    height: '90%',
  },
  iconContainer: {
    position: 'absolute',
    borderRadius: 9999,
    transform: [
      {
        translateY: -30,
      },
    ],
  },
  iconWrapper: {
    height: 60,
    aspectRatio: 1,
    borderRadius: 30,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingContainer: { marginTop: 60 },
  heading: { fontSize: 25 },
  scannerContainer: {
    marginTop: 92,
    padding: 12,
    borderRadius: 16,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: '#413f3f',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  addressContainer: { width: 210, marginTop: 20 },
  addressText: { textAlign: 'center' },
  bottomContainer: { marginTop: 44, flexDirection: 'row', marginBottom: 76 },
  bottomTextWrapper: { flexDirection: 'row' },
  bottomIconContainer: { width: 28, aspectRatio: 1, marginRight: 6 },
  bottomText: { fontSize: 19 },
  divider: { borderLeftWidth: 1, marginHorizontal: 19 },
});
