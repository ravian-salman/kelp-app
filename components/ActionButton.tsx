import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const ActionButton = ({
  style,
  titleStyle,
  onPress = () => {},
  title,
}: {
  style?: any;
  titleStyle?: any;
  onPress: any;
  title: string;
}): JSX.Element => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, { ...style }]}>
      <Text style={[{ color: 'white' }, { ...titleStyle }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    backgroundColor: '#46D6A2',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
