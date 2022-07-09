import { StyleSheet } from 'react-native';

export const PinCardStyles = StyleSheet.create({
  cardContainer: {
    height: '100%',
    position: 'relative',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowBackOutlineIconStyle: {
    width: 30,
    height: 30,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 36,
  },
  title: {
    fontSize: 25,
    color: '#3a3c3f',
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textWrapper: {
    margin: 10,
    width: 40,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  input: {
    fontSize: 30,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    paddingHorizontal: 25,
  },
  button: {
    width: '100%',
  },
  iconContainer: { position: 'absolute', top: 25, left: 25, zIndex: 2 },
  iconWrapper: {
    height: 30,
    width: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const GenericCardStyles = StyleSheet.create({
  cardContainer: {
    height: '100%',
  },
  mainContentContainer: { flex: 1, justifyContent: 'center' },
  imageContainer: {
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: 41,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    paddingBottom: 25,
    paddingHorizontal: 25,
  },
  button: {
    width: '100%',
  },
});
