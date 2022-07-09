import { responsiveScale, WINDOW_WIDTH } from './../../constants/Layout';
import { StyleSheet } from 'react-native';

export const KeyPadStyles = StyleSheet.create({
  keyPadContainer: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 40,
  },
  keyPadButtonWrapper: { flexDirection: 'row' },
  KeyPadButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: WINDOW_WIDTH / 3,
  },
  text: { fontSize: responsiveScale(12) },
  icon: { height: 30, width: 50 },
});
