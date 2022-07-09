import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  /**
   * common styles
   */
  cardContainer: {
    height: '100%',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingBottom: 25,
  },
  button: {
    width: '100%',
  },
  dynamicContentWrapper: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: 48,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  progressBarContainer: {
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 60,
  },
  skipButtonView: { height: 40, justifyContent: 'center', alignItems: 'flex-end', width: 70 },
  nextButtonView: { height: 40, justifyContent: 'center', alignItems: 'flex-start', width: 70 },
  txtSkipAndNext: { fontSize: 16 },
  title: {
    fontSize: 25,
    color: '#3a3c3f',
    textAlign: 'center',
  },
  descriptionContainer: {
    maxWidth: '80%',
    alignSelf: 'center',
    marginTop: 15,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#47484d',
  },
  contentWrapper: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },

  /** Infographic related styles */

  iconContainer: {
    position: 'absolute',
    top: 25,
    right: 25,
    zIndex: 2,
  },

  iconWrapper: {
    height: 34,
    width: 34,
    borderRadius: 9999,
  },

  /**
   * Agreement related styles
   */
  agreementPointsContainer: {
    width: '80%',
    fontSize: 12,
  },
  agreementPoints: {
    textAlign: 'left',
    color: '#47484d',
  },
  agreementScrollArea: {
    flex: 1,
    marginBottom: 24,
    marginTop: 15,
  },
  /**
   * Final related styles
   */

  subTitleContainer: {
    alignItems: 'center',
  },
});

export default styles;
