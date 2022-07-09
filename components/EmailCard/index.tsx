import { Icon } from '@ui-kitten/components';
import React, { useEffect, useRef } from 'react';
import { ScrollView, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';

import ClaimScreenImage1 from '../../assets/images/claim/screen-1.svg';
import { PoppinsBold } from '../StyledText';
import { View, TextInput, Button, SafeAreaView } from '../Themed';
import styles from './styles';

type EmailCardProps = {
  handleNextScreen: () => void;
  handleInputChange: (text: string) => void;
  inputValue: string;
  isEmailValid: boolean;
};

export default function EmailCard({
  handleInputChange,
  inputValue,
  handleNextScreen,
  isEmailValid,
}: EmailCardProps): JSX.Element {
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      scrollRef.current?.scrollTo({
        y: 620,
        animated: true,
      });
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {});

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [scrollRef]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
        }}>
        <ScrollView
          ref={scrollRef}
          bounces={false}
          contentContainerStyle={{
            flex: 1,
          }}
          style={{
            borderColor: 'pink',
          }}>
          <View style={[styles.cardContainer, { justifyContent: 'center' }]}>
            <View>
              <View style={styles.imageContainer}>
                <ClaimScreenImage1 preserveAspectRatio="xMidYMax" height={254} width={254} />
              </View>
              <View style={styles.titleContainer}>
                <PoppinsBold style={styles.title}>
                  Claim your <PoppinsBold lightColor="#47d6a2">Kelp</PoppinsBold>
                </PoppinsBold>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    lightColor="#fff"
                    onChangeText={handleInputChange}
                    value={inputValue}
                    style={styles.input}
                    placeholder="Email Address"
                  />
                  {isEmailValid && (
                    <View
                      style={{
                        position: 'absolute',
                        right: 8,
                        zIndex: 99,
                        elevation: 4,
                        borderRadius: 9999,
                        backgroundColor: '#fff',
                      }}>
                      <Icon
                        style={{ height: 20, width: 20 }}
                        name="checkmark-circle-2-outline"
                        fill="#47d6a2"
                      />
                    </View>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                size="giant"
                disabled={!isEmailValid}
                style={styles.button}
                onPress={handleNextScreen}>
                Next
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
