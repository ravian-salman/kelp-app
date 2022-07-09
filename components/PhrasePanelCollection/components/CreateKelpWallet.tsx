import React from 'react';
import { StatusBar } from 'react-native';

import ClaimScreenImage2 from '../../../assets/images/onboarding/screen-3.svg';
import Colors from '../../../constants/Colors';
import { PhraseSetupStackScreenProps } from '../../../navigation/types';
import EnhancedText from '../../EnhancedText';
import { PoppinsRegular } from '../../StyledText';
import { View, Button, SafeAreaView } from '../../Themed';
import { CreateKelpWalletStyles as styles } from './styles';

export default function CreateKepWallet({
  navigation,
}: PhraseSetupStackScreenProps<'PhraseInitialPanel'>) {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={Colors.light.background} barStyle="dark-content" />

      <View style={styles.cardContainer}>
        <View style={styles.mainContentContainer}>
          <View style={styles.imageContainer}>
            <ClaimScreenImage2 preserveAspectRatio="xMidYMax" height={224} width={224} />
          </View>
          <View style={styles.titleContainer}>
            <EnhancedText
              style={styles.title}>{`Create your [wallet]<brandLightGreen>`}</EnhancedText>
          </View>

          <View style={styles.descriptionContainer}>
            <PoppinsRegular style={styles.description}>
              In the next few steps, you will generate your Secret Phrase.
            </PoppinsRegular>
            <PoppinsRegular
              style={[
                styles.description,
                {
                  paddingHorizontal: 2,
                },
              ]}>
              Your Secret Phrase is a set of 24 random words which allows you to access your funds!
            </PoppinsRegular>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate('PhraseAgreementPanel')}
            size="giant"
            style={styles.button}>
            CREATE KELP WALLET
          </Button>
          <Button
            onPress={() => navigation.navigate('PhraseRecoveryPanel')}
            size="giant"
            style={styles.button}>
            RECOVER KELP WALLET
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
