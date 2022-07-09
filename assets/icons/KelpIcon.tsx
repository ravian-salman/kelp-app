import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function KelpIcon(props: any) {
  return (
    <View style={styles.container}>
      <Svg width={14} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <Path
          d="M.962 23.513C0 23.513 0 14.293 0 13.601 0 12.448 0 0 1.203 0h3.128c.481 0 .722.23.722.692 0 .46-.963 2.996-.963 10.373 0 .922 0 2.305.481 2.305.963 0 3.61-3.688 3.61-6.685 0-.691.24-.691.962-.691h1.684c.481 0 1.203-.23 1.203.691 0 3.92-3.128 6.224-3.128 6.916 0 .691 1.203.922 2.406 2.536 1.203 1.613 2.406 3.688 2.406 7.146 0 .922-.48.691-1.203.691h-2.406c-.722 0-.962 0-.962-.922 0-3.919-1.925-6.915-2.887-6.915-.482 0-1.685.46-1.685 1.844 0 3.458.722 5.071.722 5.763 0 .23-.24.23-.722.23H.962v-.46z"
          fill="#4FB17B"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
    paddingRight: 5,
  },
});
