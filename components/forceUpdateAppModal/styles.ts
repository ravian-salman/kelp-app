import { responsiveScale } from './../../constants/Layout';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screenContainer: {
    height: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    width: '90%',
    backgroundColor: 'white',
    padding: 10,
  },
  buttonMainView: {
    height: 50,
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
  },
  txtPopupTitle: { color: '#46D6A2', textAlign: 'center', fontSize: responsiveScale(10) },
  mainView: { width: '100%' },
});
