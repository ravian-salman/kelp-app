import * as React from 'react';

import { Text, TextProps } from './Themed';

export function MonoText({ style, ...rest }: TextProps) {
  return <Text {...rest} style={[style, { fontFamily: 'space-mono' }]} />;
}

export function PoppinsRegular({ style, ...rest }: TextProps) {
  return <Text {...rest} style={[style, { fontFamily: 'poppins-regular' }]} />;
}

export function PoppinsMedium({ style, ...rest }: TextProps) {
  return <Text {...rest} style={[style, { fontFamily: 'poppins-medium' }]} />;
}

export function PoppinsBold({ style, ...rest }: TextProps) {
  return <Text {...rest} style={[style, { fontFamily: 'poppins-bold' }]} />;
}
