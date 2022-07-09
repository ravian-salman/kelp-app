import React from 'react';
import { StyleSheet, View } from 'react-native';

import { responsiveScale } from '../../../constants/Layout';
import { PoppinsMedium } from '../../StyledText';

const PaymentProcessStep = ({ image = <></>, title = '', subtitle = '' }) => {
  return (
    <View style={styles.container}>
      <View style={styles.paymentProcessLiveView}>
        <View style={styles.paymentProcessLiveSubView}></View>
        <View style={styles.paymentProcessMarkView}>{image}</View>
      </View>
      <View style={styles.titleView}>
        <PoppinsMedium style={styles.txtTitle}>{title}</PoppinsMedium>
        {subtitle !== '' ? (
          <PoppinsMedium style={styles.txtSubTitle}>{subtitle}</PoppinsMedium>
        ) : null}
      </View>
    </View>
  );
};

export default PaymentProcessStep;

export const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', alignItems: 'flex-start' },
  paymentProcessLiveView: {
    marginLeft: 20,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentProcessLiveSubView: { width: 3, height: '100%', backgroundColor: '#46D6A2' },
  paymentProcessMarkView: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#46D6A2',
  },
  titleView: { height: '100%', flex: 1, justifyContent: 'center', marginLeft: 10 },
  txtTitle: { fontSize: responsiveScale(7) },
  txtSubTitle: { fontSize: responsiveScale(6), marginTop: 0, color: '#CDCECE' },
});
