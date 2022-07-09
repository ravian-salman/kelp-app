import { ethers } from 'ethers';
import * as Random from 'expo-random';
import * as ScreenCapture from 'expo-screen-capture';
import React, { useEffect, useState } from 'react';
import 'react-native-get-random-values';
import '@ethersproject/shims';

import { PhraseSetupStackScreenProps } from '../../../navigation/types';
import EnhancedText from '../../EnhancedText';
import { PoppinsMedium, PoppinsRegular } from '../../StyledText';
import { View, Button, SafeAreaView } from '../../Themed';
import CaptureDetection from './CaptureDetection';
import { PhraseShowStyles as styles } from './styles';
import { StatusBar, TouchableOpacity } from 'react-native';
import { Icon, Spinner } from '@ui-kitten/components';
import Colors from '../../../constants/Colors';

export default function PhraseShow({ navigation }: PhraseSetupStackScreenProps<'PhraseShowPanel'>) {
  ScreenCapture.usePreventScreenCapture();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [randomMnemonic, setRandomMnemonic] = useState<string>('');
  const [randomPhrase, setRandomPhrase] = useState<string[]>([]);

  async function generateRandomMnemonic() {
    const randomBytes = await Random.getRandomBytesAsync(16);
    const mnemonic = ethers.utils.entropyToMnemonic(randomBytes);
    setRandomMnemonic(mnemonic);
  }
  useEffect(() => {
    generateRandomMnemonic();
  }, []);

  useEffect(() => {
    if (randomMnemonic) {
      setRandomPhrase(randomMnemonic.split(' '));
      ScreenCapture.addScreenshotListener(() => {
        setModalVisible(true);
      });
    }
  }, [randomMnemonic]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={Colors.light.background} barStyle="dark-content" />

      <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', marginTop: 10 }}>
        <TouchableOpacity
          onPress={() => {
            navigation?.goBack();
          }}
          style={[
            styles.iconWrapper,
            {
              flex: 1,
            },
          ]}>
          <Icon
            style={{
              width: 30,
              height: 30,
            }}
            name="arrow-back"
            fill="#3f3f3f"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.replace('PhraseInitialPanel');
          }}
          style={styles.iconWrapper}>
          <Icon
            style={{
              width: 30,
              height: 30,
            }}
            name="close-outline"
            fill="#3f3f3f"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.mainContentContainer}>
          <View style={styles.titleContainer}>
            <EnhancedText style={styles.title}>
              {!randomMnemonic && randomPhrase.length !== 12 ? 'Generating' : 'This is your'}
            </EnhancedText>
            <EnhancedText style={styles.title}>{`[Secret Phrase]<brandLightGreen>`}</EnhancedText>
          </View>

          <View style={styles.subtitleContainer}>
            <PoppinsRegular style={styles.subtitle}>
              {!randomMnemonic && randomPhrase.length !== 12
                ? 'Please wait!'
                : 'Write down each word on a piece of paper and remember to follow the rules!'}
            </PoppinsRegular>
          </View>

          <View style={styles.phraseContainer}>
            {!randomMnemonic && randomPhrase.length !== 12 ? (
              <View
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  width: '100%',
                  paddingVertical: 50,
                }}>
                <Spinner />
              </View>
            ) : (
              <>
                <View style={styles.leftPhraseWrapper}>
                  {randomPhrase
                    .filter((_, idx) => idx < 6)
                    .map((word, idx) => (
                      <View
                        key={idx}
                        style={[
                          styles.phrase,
                          {
                            marginTop: idx === 0 ? undefined : 36,
                          },
                        ]}>
                        <PoppinsMedium style={[styles.word, { color: '#CDCECE', marginRight: 25 }]}>
                          {idx + 1}
                        </PoppinsMedium>
                        <PoppinsMedium style={styles.word}>{word}</PoppinsMedium>
                      </View>
                    ))}
                </View>
                <View style={styles.rightPhraseWrapper}>
                  {randomPhrase
                    .filter((_, idx) => idx >= 6)
                    .map((word, idx) => (
                      <View
                        key={idx}
                        style={[
                          styles.phrase,
                          {
                            marginTop: idx === 0 ? undefined : 36,
                          },
                        ]}>
                        <PoppinsMedium style={[styles.word, { marginRight: 25 }]}>
                          {word}
                        </PoppinsMedium>
                        <PoppinsMedium style={[styles.word, { color: '#CDCECE' }]}>
                          {idx + 7}
                        </PoppinsMedium>
                      </View>
                    ))}
                </View>
              </>
            )}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() =>
              navigation.navigate('PhraseVerifyPanel', {
                phrase: randomPhrase,
              })
            }
            size="giant"
            style={styles.button}>
            NEXT
          </Button>
        </View>
      </View>
      <CaptureDetection modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </SafeAreaView>
  );
}
