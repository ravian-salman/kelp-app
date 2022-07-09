import { Icon } from '@ui-kitten/components';
import { BlurView } from 'expo-blur';
import React, { useMemo, useState, useEffect } from 'react';
import { Pressable } from 'react-native';

import { AddKelp, PaymentMethod } from '../../components/BuyKelpPanelCollection';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { RootStackScreenProps } from '../../navigation/types';
import { BuyKelpModalScreenStyles as styles } from './styles';
import { PoppinsBold, PoppinsRegular } from '../../components/StyledText';
import { useWalletContext } from '../../hooks/useWallet';
import axios from 'axios';
import { mapping } from '@eva-design/eva';

enum ScreenVariant {
  ADD_KELP = 'ADD_KELP',
  PAYMENT_METHOD = 'PAYMENT_METHOD',
}

export default function BuyKelpModalScreen({
  navigation,
}: RootStackScreenProps<'BuyKelpModal'>): JSX.Element {
  const [competitions_data, setCompetitionData] = useState([]);
  const [activeScreenVariant, setActiveScreenVariant] = useState<ScreenVariant>(
    ScreenVariant.ADD_KELP
  );

  useEffect(() => {
    console.log('----------------------gleam api integreation---------------------');
    // setCompetitionData(actions);
    console.log('---------------------/gleam api integration/----------------------');
  }, []);

  const colorScheme = useColorScheme();

  const modalContent = useMemo(() => {
    switch (activeScreenVariant) {
      case ScreenVariant.ADD_KELP:
        return <AddKelp onComplete={() => setActiveScreenVariant(ScreenVariant.PAYMENT_METHOD)} />;
      case ScreenVariant.PAYMENT_METHOD:
        return <PaymentMethod onBack={() => setActiveScreenVariant(ScreenVariant.ADD_KELP)} />;
      default:
        return null;
    }
  }, [activeScreenVariant]);

  return (
    <BlurView intensity={90} tint="dark" style={styles.screenContainer}>
      <View style={styles.screenWrapper}>
        <View style={styles.iconContainer}>
          {/* Close Modal Button */}
          <Pressable onPress={() => navigation.pop()}>
            <View
              style={[
                styles.iconWrapper,
                {
                  backgroundColor: Colors[colorScheme].brandLightGreen,
                },
              ]}>
              <Icon name="close-outline" fill="#fff" />
            </View>
          </Pressable>
        </View>

        {/* Content */}
        <View
          style={{
            marginTop: 60,
            width: '100%',
            flex: 1,
          }}>
          <PoppinsBold
            style={[
              {
                color: Colors[colorScheme].brandLightGreen,
                fontSize: 28,
                textAlign: 'center',
              },
            ]}></PoppinsBold>
          {competitions_data.map((data, index) => {
            return (
              <Text
                style={[
                  {
                    margin: 30,
                    fontSize: 24,
                    textAlign: 'center',
                    color: Colors[colorScheme].contentWarning,
                  },
                ]}
                key={index}>
                {data.title}
              </Text>
            );
          })}
        </View>
      </View>
    </BlurView>
  );
}
