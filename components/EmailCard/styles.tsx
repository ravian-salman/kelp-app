import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#3a3c3f',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 31,
    paddingHorizontal: 25,
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
  },
  input: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    paddingHorizontal: 10,
    shadowColor: '#413f3f',
    elevation: 4,
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 90,
    paddingHorizontal: 25,
  },
  button: {
    width: '100%',
    marginTop: 30,
  },
});

export default styles;
