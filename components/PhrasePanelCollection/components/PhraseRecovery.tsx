import { Icon } from '@ui-kitten/components';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useWalletContext } from '../../../hooks/useWallet';
import { RootStackScreenProps } from '../../../navigation/types';
import EnhancedText from '../../EnhancedText';
import { PoppinsBold, PoppinsRegular } from '../../StyledText';
import { View, SafeAreaView, Button } from '../../Themed';
import { PhraseRecoveryStyles as styles } from './styles';

export default function PhraseRecovery({ navigation }: RootStackScreenProps<'PhraseSetup'>) {
  const colorScheme = useColorScheme();
  const { generateWalletFromPhrase } = useWalletContext();

  const inputRef = useRef<TextInput>(null);
  const scrollRef = useRef<ScrollView>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [phrase, setPhrase] = useState(['', '', '', '', '', '', '', '', '', '', '', '']);

  useEffect(() => {
    setInputValue(phrase[activeIndex]);
    inputRef.current?.focus();
  }, [activeIndex, phrase]);

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

  const handleBalloonPress = useCallback((idx) => {
    inputRef.current?.focus();

    setActiveIndex(idx);
    setInputValue(phrase[idx]);
  }, []);

  const handlePressNext = useCallback(() => {
    /**
     * If all words are not entered
     */
    setInputValue('');
    phrase[activeIndex] = inputValue.trim();
    setPhrase([...phrase]);

    if (activeIndex < 12) {
      setActiveIndex(activeIndex + 1);
    }
  }, [activeIndex, inputValue, phrase]);

  const handleSubmit = () => {
    generateWalletFromPhrase(phrase.join(' '));
    navigation.navigate('SecuritySetup', {
      screen: 'CreatePinPanel',
    });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <StatusBar backgroundColor={Colors.light.background} barStyle="dark-content" />

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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
        style={{
          flex: 1,
        }}>
        <ScrollView
          ref={scrollRef}
          bounces={false}
          contentContainerStyle={{
            flex: 1,
          }}>
          <View style={[styles.cardContainer, { justifyContent: 'center' }]}>
            <View style={styles.mainContentContainer}>
              <View style={styles.titleContainer}>
                <EnhancedText
                  style={styles.title}>{`Recover your [wallet]<brandLightGreen>`}</EnhancedText>
              </View>

              <View style={styles.subtitleContainer}>
                <PoppinsRegular style={styles.subtitle}>
                  Type each word of your Secret Phrase in the correct order.
                </PoppinsRegular>
              </View>

              <View style={styles.phraseContainer}>
                {[0, 3, 6, 9].map((value) => (
                  <View key={value} style={styles.phraseWrapper}>
                    {[0, 1, 2].map((_, idx) => (
                      <Pressable key={value + idx} onPress={() => handleBalloonPress(value + idx)}>
                        <View
                          style={[
                            styles.phrase,
                            {
                              backgroundColor:
                                phrase[value + idx] === ''
                                  ? 'transparent'
                                  : Colors[colorScheme].brandLightGreen,
                              borderStyle: phrase[value + idx] === '' ? 'dashed' : 'solid',
                              borderColor:
                                activeIndex === value + idx || phrase[value + idx] !== ''
                                  ? Colors[colorScheme].brandLightGreen
                                  : '#CDCECE',
                            },
                          ]}>
                          <PoppinsBold
                            style={{
                              color: '#fff',
                            }}>
                            {phrase[value + idx]}
                          </PoppinsBold>
                        </View>
                      </Pressable>
                    ))}
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.inputContainer}>
              {activeIndex === phrase.length &&
              phrase.reduce((acc, value) => acc && value !== '', true) ? (
                <>
                  <Button size="giant" style={styles.button} onPress={handleSubmit}>
                    SUBMIT
                  </Button>
                  <PoppinsRegular style={styles.editText}>Or tap a word to edit</PoppinsRegular>
                </>
              ) : (
                <TextInput
                  ref={inputRef}
                  autoCapitalize="none"
                  style={{
                    color: 'black',
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    textAlign: 'center',
                    fontWeight: '700',
                    fontSize: 32,
                  }}
                  blurOnSubmit={false}
                  value={inputValue}
                  onChangeText={(text) => setInputValue(text)}
                  onSubmitEditing={handlePressNext}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
