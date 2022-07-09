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
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
    paddingHorizontal: 25,
  },
  button: {
    width: '100%',
    marginTop: 20,
  },
});

export default styles;
