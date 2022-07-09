import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '@ui-kitten/components';
import * as Haptics from 'expo-haptics';
import * as LocalAuthentication from 'expo-local-authentication';
import { getItemAsync } from 'expo-secure-store';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';

import { triggerDistribution } from '../../../apis/distribution';
import Colors from '../../../constants/Colors';
import { WINDOW_HEIGHT } from '../../../constants/Layout';
import { Onboarding } from '../../../constants/OnboardingStatus';
import { useAuthContext } from '../../../hooks/useAuth';
import {
  AuthStackParamList,
  AuthStackScreenProps,
  SecuritySetupStackParamList,
  SecuritySetupStackScreenProps,
} from '../../../navigation/types';
import KeyPad from '../../KeyPad';
import { PoppinsBold, PoppinsRegular } from '../../StyledText';
import { View, Button, SafeAreaView } from '../../Themed';
import { PinCardStyles as styles } from './styles';

type PinCardProps = {
  nextButtonText?: string;
};

type routeType =
  | SecuritySetupStackScreenProps<'ConfirmPinPanel'>['route']
  | SecuritySetupStackScreenProps<'CreatePinPanel'>['route']
  | AuthStackScreenProps<'VerifyPinPanel'>['route'];

type navigationType = NativeStackNavigationProp<
  AuthStackParamList & SecuritySetupStackParamList,
  keyof AuthStackParamList & keyof SecuritySetupStackParamList
>;

export default function PinCard({
  route,
  navigation,
  nextButtonText = 'Next',
}:
  | {
      route: routeType;
      navigation: navigationType;
    } & PinCardProps): JSX.Element {
  const [pin, setPin] = useState('');
  const { setOnboardingState, setLocalPin, setIsAuthComplete, localPin, isEnableBioMetric } =
    useAuthContext();

  const isPinValid = useMemo(() => {
    return pin.length === 4;
  }, [pin]);

  const handlePinChange = useCallback(
    (buttonValue: any) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      if (pin.length <= 3) {
        setPin(pin.concat(buttonValue));
      }
    },
    [pin]
  );

  const handleBackSpace = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setPin(pin.slice(0, -1));
  }, [pin]);

  const cardTitle = useMemo(() => {
    switch (route.name) {
      case 'CreatePinPanel':
        return 'Set a Passcode';
      case 'ConfirmPinPanel':
        return 'Confirm Passcode';
      case 'VerifyPinPanel':
        return 'Passcode';
      default:
        return 'Set a Passcode';
    }
  }, []);

  const handleComplete = useCallback(async () => {
    const walletAddress = await getItemAsync('walletAddress');
    switch (route.name) {
      case 'CreatePinPanel':
        navigation.navigate('ConfirmPinPanel', {
          pin,
        });
        break;
      case 'ConfirmPinPanel':
        if (route.params?.pin === pin) {
          setLocalPin(pin);
          setIsAuthComplete(true);
          triggerDistribution(walletAddress);
          setOnboardingState(Onboarding.BIOMETRIC_SETUP_PENDING);
        }
        break;
      case 'VerifyPinPanel':
        if (pin === localPin) {
          setIsAuthComplete(true);
        }
        break;
      default:
        break;
    }
  }, [pin]);

  useEffect(() => {
    (async () => {
      switch (route.name) {
        case 'VerifyPinPanel':
          if (isEnableBioMetric) {
            const biometricAuth = await LocalAuthentication.authenticateAsync({
              promptMessage: 'Login with Biometrics',
            });

            if (biometricAuth?.success) {
              setIsAuthComplete(true);
            }
          }
          break;
        default:
          break;
      }
    })();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={Colors.light.background} barStyle="dark-content" />

      <View style={styles.cardContainer}>
        {route.name === 'ConfirmPinPanel' ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
              alignSelf: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation?.goBack();
              }}>
              <Icon
                style={{
                  width: 30,
                  height: 30,
                }}
                name="arrow-back"
                fill="#3f3f3f"
              />
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <PoppinsBold style={styles.title}>{cardTitle}</PoppinsBold>
          </View>
          <View style={styles.inputContainer}>
            {[0, 1, 2, 3].map((index) => (
              <View
                key={index}
                style={[
                  styles.textWrapper,
                  pin[index] !== undefined
                    ? {
                        borderBottomColor: '#47d6a2',
                      }
                    : {
                        borderBottomColor: '#CDCECE',
                      },
                ]}>
                <PoppinsRegular style={styles.input}>{pin[index]}</PoppinsRegular>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            size="giant"
            disabled={!isPinValid}
            onPress={handleComplete}
            style={styles.button}>
            {nextButtonText}
          </Button>
        </View>
        <KeyPad
          onPress={handlePinChange}
          onBackSpace={handleBackSpace}
          keyBoardHeight={WINDOW_HEIGHT / 2}
        />
      </View>
    </SafeAreaView>
  );
}
