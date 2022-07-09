import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
  iconWrapper: { height: 60, aspectRatio: 1, borderRadius: 30, margin: 4,justifyContent:'center',alignItems:'center' },
  headingContainer: { marginTop: 60 },
  heading: { fontSize: 25 },
  walletsContainer: {
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  walletWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 20,
  },
});
