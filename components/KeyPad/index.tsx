import { Icon } from '@ui-kitten/components';
import React from 'react';
import { Pressable, ViewStyle } from 'react-native';

import { PoppinsRegular } from '../StyledText';
import { View } from '../Themed';
import { KeyPadStyles as styles } from './styles';

type Props = {
  style?: ViewStyle;
  onPress: (item: number | string) => void;
  onBackSpace: () => void;
  extraButtonText?: string;
  keyBoardHeight?: number;
};

export default function KeyPad({
  style,
  onPress,
  onBackSpace,
  extraButtonText,
  keyBoardHeight = 250,
}: Props) {
  return (
    <View style={[styles.keyPadContainer, style, { height: keyBoardHeight }]}>
      {[
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [extraButtonText ?? null, 0, 'BACKSPACE'],
      ].map((numberRow: (number | null | string)[], idx: number) => (
        <View key={idx} style={[styles.keyPadButtonWrapper, { height: keyBoardHeight / 4 }]}>
          {numberRow.map((item) => {
            if (typeof item === 'number' || (typeof item === 'string' && item !== 'BACKSPACE')) {
              return (
                <Pressable key={item} style={styles.KeyPadButton} onPress={() => onPress(item)}>
                  <PoppinsRegular style={styles.text}>{`${item}`}</PoppinsRegular>
                </Pressable>
              );
            } else if (typeof item === 'string' && item === 'BACKSPACE') {
              return (
                <Pressable
                  key={item}
                  style={[styles.KeyPadButton]}
                  onPress={() => {
                    onBackSpace();
                  }}>
                  <Icon style={styles.icon} name="backspace" fill="#2C2D2F" />
                </Pressable>
              );
            } else if (item === null) {
              return <View key={item} style={styles.KeyPadButton}></View>;
            } else {
              return null;
            }
          })}
        </View>
      ))}
    </View>
  );
}
