import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function BNBIcon(props: any) {
  return (
    <View style={styles.container}>
      <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <Path
          d="M7.33898 10.085L12 5.424L16.6631 10.087L19.3751 7.37501L12 0L4.62718 7.3728L7.33907 10.0848L7.33898 10.085ZM0 12L2.71209 9.28752L5.42398 11.9994L2.71189 14.7115L0 12ZM7.33898 13.9153L12 18.576L16.663 13.9131L19.3765 16.6236L19.3751 16.6251L12 24L4.62718 16.6272L4.62334 16.6234L7.33927 13.915L7.33898 13.9153ZM18.5759 12.0012L21.288 9.28906L23.9999 12.001L21.2879 14.7131L18.5759 12.0012Z"
          fill="#F3BA2F"
        />
        <Path
          d="M14.7505 11.9985H14.7517L11.9999 9.24661L9.966 11.28L9.73234 11.5137L9.25042 11.9958L9.24658 11.9995L9.25042 12.0034L11.9999 14.7534L14.7519 12.0014L14.7532 11.9999L14.7507 11.9985"
          fill="#F3BA2F"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
