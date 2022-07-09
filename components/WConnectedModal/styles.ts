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
    height: '40%',
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
  content: { fontSize: 19, lineHeight: 24, textAlign: 'center' },
  walletsContainer: {
    maxWidth: '70%',
    flexDirection: 'row',
    textAlign: 'center',
    flexWrap: 'wrap',
    marginTop: 45,
    padding: 10,
  },
  addressContainer: { width: 210, marginTop: 20 },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingBottom: 25,
    marginTop: 44,
  },
  button: {
    width: '100%',
  },
});
