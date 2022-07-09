import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cardContainer: {
    height: '100%',
  },
  imageContainer: {
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
  },
  descriptionContainer: {
    alignItems: 'center',
    maxWidth: '80%',
    alignSelf: 'center',
    marginVertical: 8,
  },
  description: {
    textAlign: 'center',
    color: '#47484d',
    fontSize: 30,
  },
  inputContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  input: {
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    height: 40,
    width: 300,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 7,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    width: '90%',
    maxWidth: 340,
    borderRadius: 10,
    marginTop: 30,
  },
});

export default styles;
