import { StyleSheet } from 'react-native';

export const BuyKelpModalScreenStyles = StyleSheet.create({
  screenContainer: {
    height: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  screenWrapper: {
    height: '90%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
    alignItems: 'center',
    paddingBottom: 60,
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
  iconWrapper: { height: 60, aspectRatio: 1, borderRadius: 9999, margin: 4 },
});
