import { Icon } from '@ui-kitten/components';
import React from 'react';
import { Pressable } from 'react-native';

import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { PoppinsRegular } from '../StyledText';
import { View } from '../Themed';
import styles from './styles';

type CheckBoxProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

export default function CheckBox({ label, isActive, onPress }: CheckBoxProps) {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.agreementContainer}>
      <Pressable onPress={onPress}>
        <View
          style={[
            styles.checkbox,
            {
              borderColor: isActive ? Colors[colorScheme].brandLightGreen : '#cdcfce',
              backgroundColor: isActive ? Colors[colorScheme].brandLightGreen : undefined,
            },
          ]}>
          {isActive && <Icon style={{ height: 14, width: 14 }} name="checkmark" fill="#ffffff" />}
        </View>
      </Pressable>
      <View
        style={{
          flex: 1,
        }}>
        <PoppinsRegular onPress={onPress} style={styles.label}>
          {label}
        </PoppinsRegular>
      </View>
    </View>
  );
}
