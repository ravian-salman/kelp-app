import * as LocalAuthentication from 'expo-local-authentication';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Platform, StatusBar } from 'react-native';

import AdditionalSecurity from '../../assets/images/bioMetric/AdditionalSecurity.svg';
import FaceIdAndroid from '../../assets/images/bioMetric/FaceIdAndroid.svg';
import FaceIdIOS from '../../assets/images/bioMetric/FaceIdIOS.svg';
import FingerAndroid from '../../assets/images/bioMetric/FingerAndroid.svg';
import FingerIOS from '../../assets/images/bioMetric/FingerIOS.svg';
import EnhancedText from '../../components/EnhancedText';
import { PoppinsRegular } from '../../components/StyledText';
import { Button, SafeAreaView, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { Onboarding } from '../../constants/OnboardingStatus';
import { useAuthContext } from '../../hooks/useAuth';
import styles from './styles';

export default function BioMetricSetup(): JSX.Element | null {
  const { setOnboardingState, setIsEnableBioMetric } = useAuthContext();
  const [facialRecognitionAvailable, setFacialRecognitionAvailable] = useState<boolean>(false);
  const [fingerprintAvailable, setFingerprintAvailable] = useState<boolean>(false);
  const [irisAvailable, setIrisAvailable] = useState<boolean>(false);
  const onPressNoJustPassword = () => {
    setOnboardingState(Onboarding.COMPLETE);
  };

  const onPressEnableFringerPrint = async () => {
    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics',
    });

    if (biometricAuth?.success) {
      setIsEnableBioMetric(true);
      setOnboardingState(Onboarding.COMPLETE);
    }
  };

  useEffect(() => {
    checkSupportedAuthentication();
  }, []);

  const checkSupportedAuthentication = async () => {
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (types?.length) {
      setFacialRecognitionAvailable(
        types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)
      );
      setFingerprintAvailable(types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT));
      setIrisAvailable(types.includes(LocalAuthentication.AuthenticationType.IRIS));
    }
  };

  const BiomatricAvailable = () => {
    if (Platform.OS === 'android') {
      if (fingerprintAvailable) {
        return <FingerIOS height={'100%'} width={'100%'} />;
      } else {
        return <FaceIdAndroid height={'100%'} width={'100%'} />;
      }
    } else {
      if (fingerprintAvailable) {
        return <FingerAndroid height={'100%'} width={'100%'} />;
      } else {
        return <FaceIdIOS height={'100%'} width={'100%'} />;
      }
    }
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={Colors.light.background} barStyle="dark-content" />

      <View style={[styles.cardContainer]}>
        <View style={styles.dynamicContentWrapper}>
          <View style={styles.imageContainer}>
            <View style={{ width: '100%', marginTop: '15%' }}>
              <AdditionalSecurity width={'100%'} />
            </View>
          </View>
          <View style={styles.titleContainer}>
            <EnhancedText style={styles.title}>
              {'Additional [security?]<brandLightGreen>'}
            </EnhancedText>
          </View>
          <View style={styles.descriptionContainer}>
            <PoppinsRegular style={styles.description}>
              {'Do you want to use biometric security as well?'}
            </PoppinsRegular>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={onPressEnableFringerPrint}
            style={[
              {
                borderRadius: 10,
                overflow: 'hidden',
                height: 56,
                marginBottom: 20,
                paddingVertical: 10,
                backgroundColor: '#46D6A2',
              },
              styles.button,
            ]}>
            <BiomatricAvailable />
          </TouchableOpacity>
          <Button onPress={onPressNoJustPassword} size="giant" style={styles.button}>
            Nah, just Passcode
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
