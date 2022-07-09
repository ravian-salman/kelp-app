import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button as KittenBtn, Text } from '@ui-kitten/components';
import React from 'react';
import Modal from 'react-native-modal';

import { RootStackParamList, PhraseSetupStackParamList } from '../../../navigation/types';
import EnhancedText from '../../EnhancedText';
import { View } from '../../Themed';
import { PhraseVerifyStyles as styles } from './styles';

type navigationType = NativeStackNavigationProp<
  RootStackParamList & PhraseSetupStackParamList,
  keyof RootStackParamList & keyof PhraseSetupStackParamList
>;

export default function CaptureDetection({
  navigation,
  modalVisible,
  setModalVisible,
}: {
  navigation: navigationType;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}) {
  return (
    <Modal
      useNativeDriver={true}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropOpacity={0.1}
      style={{ margin: 0 }}
      isVisible={modalVisible}>
      <View style={styles.modalCard}>
        <EnhancedText style={styles.modalTitle}>{`[Warning!]<contentWarning>`}</EnhancedText>
        <EnhancedText style={styles.modalSubTitle}>
          You have selected the wrong choice.
        </EnhancedText>
        <Text style={styles.modalContent}>
          Please make sure you've backed up the mnemonic phrase in a safe environment. If you've
          forgotten to back it up, please{' '}
          <Text
            style={styles.modalBackText}
            onPress={() => {
              setModalVisible(false);
              navigation.replace('PhraseAgreementPanel');
            }}>
            go back
          </Text>
          , and generate a new wallet before proceeding. If you hit the wrong choice accidentally,
          click on "Retry".
        </Text>
        <KittenBtn
          style={styles.modalCTA}
          size="large"
          onPress={() => setModalVisible(!modalVisible)}>
          Retry
        </KittenBtn>
      </View>
    </Modal>
  );
}
