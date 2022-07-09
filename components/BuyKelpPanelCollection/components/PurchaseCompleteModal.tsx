import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

import PaymentSuccessful from '../../../assets/images/icons/PaymentSuccessful.svg';
import { responsiveScale } from '../../../constants/Layout';
import { PoppinsBold, PoppinsMedium } from '../../StyledText';
import { Button } from '../../Themed';

const PurchaseCompleteModal = ({ isVisible = false, onClose = () => {} }) => {
  return (
    <Modal
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropOpacity={0.5}
      style={{ margin: 0 }}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.containerSubView}>
          <PaymentSuccessful width={'100%'} height={'100%'} />
          <View style={styles.mainContentView}>
            <Button onPress={onClose} size="giant" style={styles.btnSuper}>
              {(evaProps) => (
                <PoppinsBold {...evaProps} style={styles.txtSuper}>
                  Super!
                </PoppinsBold>
              )}
            </Button>
            <View style={styles.purChaseTxtMainView}>
              <PoppinsMedium style={styles.txtPurchaseComplate}>Purchase Complete 😎</PoppinsMedium>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PurchaseCompleteModal;

export const styles = StyleSheet.create({
  container: { width: '80%', alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0)' },
  purChaseTxtMainView: {
    width: '100%',
    aspectRatio: 2.2,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtPurchaseComplate: { color: 'white', fontSize: responsiveScale(7.5) },
  btnSuper: {
    backgroundColor: 'white',
    marginBottom: 20,
    width: '90%',
    alignSelf: 'center',
  },
  mainContentView: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'column-reverse',
  },
  txtSuper: { color: '#46D6A2', fontSize: 15 },
  containerSubView: {
    width: '100%',
    aspectRatio: 0.861,
    backgroundColor: 'rgba(0,0,0,0)',
  },
});
