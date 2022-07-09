import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import React, { useCallback, useEffect, useState } from 'react';
import { Icon, Spinner } from '@ui-kitten/components';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useWalletContext } from '../../../hooks/useWallet';
import {
  PhraseSetupStackScreenProps,
  RootStackParamList,
  PhraseSetupStackParamList,
} from '../../../navigation/types';
import { shuffleArray } from '../../../utils/shuffle';
import EnhancedText from '../../EnhancedText';
import { PoppinsBold, PoppinsRegular } from '../../StyledText';
import { View, Button, SafeAreaView } from '../../Themed';
import VerifyModal from './VerifyModal';
import { PhraseVerifyStyles as styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';

type routeType = PhraseSetupStackScreenProps<'PhraseVerifyPanel'>['route'];

type navigationType = NativeStackNavigationProp<
  RootStackParamList & PhraseSetupStackParamList,
  keyof RootStackParamList & keyof PhraseSetupStackParamList
>;

export default function PhraseVerify({
  navigation,
  route,
}: {
  navigation: navigationType;
  route: routeType;
}) {
  const colorScheme = useColorScheme();
  const { generateWalletFromPhrase } = useWalletContext();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const randomPhrase = route.params.phrase;

  const randomWordBag = randomPhrase;

  const verifyWord = useCallback(
    (word) => {
      if (randomPhrase[currentIdx] === word) {
        setCurrentIdx((prevIdx) => prevIdx + 1);
      } else {
        setModalVisible(true);
      }
    },
    [currentIdx]
  );

  async function generateWallet() {
    await navigation.replace('SecuritySetup', { screen: 'CreatePinPanel' });
    generateWalletFromPhrase(randomPhrase.join(' '));
  }

  useEffect(() => {
    if (currentIdx >= randomPhrase.length) {
      generateWallet();
    }
  }, [currentIdx, randomPhrase]);

  let firstid;
  let secondid;

  do {
    firstid = Math.floor(Math.random() * randomWordBag.length);
  } while (firstid === currentIdx);

  do {
    secondid = Math.floor(Math.random() * randomWordBag.length);
  } while (secondid === firstid || secondid === currentIdx);

  const wordArray = shuffleArray(
    currentIdx !== 12
      ? [randomPhrase[currentIdx], randomWordBag[firstid], randomWordBag[secondid]]
      : ['', '', '']
  );

  const isCreated = currentIdx >= randomPhrase.length;

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        <TouchableOpacity
          onPress={() => {
            navigation.replace('PhraseInitialPanel');
          }}>
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
      <View style={[styles.cardContainer, { justifyContent: 'center' }]}>
        <View style={styles.mainContentContainer}>
          <View style={styles.titleContainer}>
            <EnhancedText style={styles.title}>
              {isCreated ? 'Creating' : 'Verify your'}
            </EnhancedText>
            <EnhancedText style={styles.title}>
              {isCreated ? `[Your wallet]<brandLightGreen>` : `[Secret Phrase]<brandLightGreen>`}
            </EnhancedText>
          </View>

          <View style={styles.subtitleContainer}>
            <PoppinsRegular style={styles.subtitle}>
              {isCreated
                ? 'Please wait!'
                : 'Match the order of your Secret Phrase by selecting the correct words.'}
            </PoppinsRegular>
          </View>

          {isCreated ? (
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
            <View style={styles.phraseContainer}>
              {[0, 3, 6, 9].map((value) => (
                <View key={value} style={styles.phraseWrapper}>
                  {randomPhrase
                    .filter((_, idx) => value + idx >= value && value + idx < value + 3)
                    .map((word, idx) => (
                      <View
                        key={word}
                        style={[
                          styles.phrase,
                          {
                            backgroundColor:
                              currentIdx > value + idx
                                ? Colors[colorScheme].brandLightGreen
                                : '#CDCECE',
                          },
                        ]}>
                        <PoppinsBold style={styles.phraseIndex}>{value + idx + 1}</PoppinsBold>
                      </View>
                    ))}
                </View>
              ))}
            </View>
          )}
        </View>
        {!isCreated && (
          <View style={styles.buttonContainer}>
            {wordArray.map((word, idx) => (
              <Button
                key={idx}
                onPress={() => verifyWord(word)}
                size="giant"
                style={[
                  styles.button,
                  {
                    marginTop: idx === 0 ? undefined : 15,
                  },
                ]}>
                {wordArray[idx]}
              </Button>
            ))}
          </View>
        )}
      </View>
      <VerifyModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}
