import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;

const INCREASE_FONT_SIZE_BY_PERCENTAGE = 1.15; // 15%

export const responsiveScale = (fontSize) =>
  RFValue(fontSize * INCREASE_FONT_SIZE_BY_PERCENTAGE, WINDOW_WIDTH);
