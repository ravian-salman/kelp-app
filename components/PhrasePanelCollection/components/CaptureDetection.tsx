import React from 'react';
import Modal from 'react-native-modal';

import NoCaptureImage from '../../../assets/images/claim/no-capture.svg';
import EnhancedText from '../../EnhancedText';
import { PoppinsRegular } from '../../StyledText';
import { View, Button } from '../../Themed';
import { CreateKelpWalletStyles as styles } from './styles';

export default function CaptureDetection({ modalVisible, setModalVisible }) {
  return (
    <Modal
      useNativeDriver={true}
      animationIn={'wobble'}
      animationOut={'fadeOutDown'}
      backdropOpacity={0.1}
      style={{ margin: 0 }}
      isVisible={modalVisible}>
      <View style={styles.cardContainer}>
        <View style={styles.mainContentContainer}>
          <View style={styles.imageContainer}>
            <NoCaptureImage preserveAspectRatio="xMidYMax" height={224} width={224} />
          </View>
          <View style={styles.titleContainer}>
            <EnhancedText
              style={styles.title}>{`Screenshot [detected]<brandLightGreen>`}</EnhancedText>
          </View>

          <View style={styles.descriptionContainer}>
            <PoppinsRegular style={styles.description}>
              Looks like you just took a screenshot. Make sure you never take a screenshot as you
              might expose your Recovery Secret Phrase!
            </PoppinsRegular>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={() => setModalVisible(false)} size="giant" style={styles.button}>
            Continue
          </Button>
        </View>
      </View>
    </Modal>
  );
}
