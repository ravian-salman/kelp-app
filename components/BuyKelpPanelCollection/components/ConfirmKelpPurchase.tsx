import { Icon } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import Equal from '../../../assets/images/publicSale/Equal.svg';
import Minus from '../../../assets/images/publicSale/Minus.svg';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { gasFee } from '../../../utils/contracts/interactionFirst';
import { PoppinsBold, PoppinsMedium } from '../../StyledText';
import { Button, View } from '../../Themed';
import PaymentProcessStep from './PaymentProcessStep';
import { PaymentMethodStyles as styles } from './styles';
import { buyKelpActions } from '../../../redux/reducer/buyKelp';

const ConfirmKelpPurchase = ({
  onBack,
  onComplete,
}: {
  onBack: () => void;
  onComplete?: () => void;
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const gasData = async () => {
      const data = await gasFee();
      dispatch(buyKelpActions.SetGasFee(data));
    };
    gasData();
  }, []);

  const colorScheme = useColorScheme();

  const usdBalance = useSelector((state: any) => state.BUYKELPSLICE.originalDollarBalance);
  const gasTranFee = useSelector((state: any) => state.BUYKELPSLICE.gasFee);
  const currentMarketPriceofBNB = '221.46972628107';
  const transactionFee = Number(currentMarketPriceofBNB) * Number(gasTranFee);

  return (
    <View style={styles.container}>
      {/* Heading */}
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 25,
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <Pressable onPress={onBack}>
            <Icon
              style={{
                width: 24,
                height: 24,
              }}
              fill="#000"
              name="arrow-back"
            />
          </Pressable>
        </View>
        <View>
          <PoppinsBold style={[styles.headingText, { color: Colors[colorScheme].brandLightGreen }]}>
            Confirm KELP Purchase
          </PoppinsBold>
        </View>
        <View
          style={{
            flex: 1,
          }}></View>
      </View>

      {/* Method List */}
      <View style={styles.methodContainer}>
        {/* BNB */}
        <View style={styles.cardContainer}>
          <View style={styles.methodTitleWrapper}>
            <PoppinsBold
              style={[styles.txtYouPay, { color: Colors[colorScheme].contentSecondary }]}>
              YOU PAY
            </PoppinsBold>
            <PoppinsMedium style={styles.methodTitle}>$ {usdBalance}</PoppinsMedium>
          </View>
          <View style={styles.txtUsdView}>
            <PoppinsMedium style={styles.txtUsd}>USD</PoppinsMedium>
          </View>
        </View>

        <View style={styles.viewPaymentProcess}>
          <PaymentProcessStep
            image={<Minus width={'100%'} height={'100%'} />}
            title={`${gasTranFee} BNB Transaction fee`}
            subtitle={`$${transactionFee} USD Transaction fee`}
          />
          <PaymentProcessStep
            image={<Equal width={'100%'} height={'100%'} />}
            title={`$${usdBalance - transactionFee} USD Subtotal`}
          />
          <PaymentProcessStep
            title={`${
              (Number(usdBalance - transactionFee) * 0.01) / Number(currentMarketPriceofBNB)
            } per BNB `}
          />
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.methodTitleWrapper}>
            <PoppinsBold
              style={[styles.txtYouPay, { color: Colors[colorScheme].contentSecondary }]}>
              YOU RECIEVE
            </PoppinsBold>
            <PoppinsMedium style={styles.methodTitle}>
              {Number(usdBalance - transactionFee) * 0.01 > 0
                ? (Number(usdBalance - transactionFee) * 0.01).toFixed(9)
                : 0}
            </PoppinsMedium>
          </View>
          <View style={styles.txtUsdView}>
            <PoppinsMedium style={styles.txtUsd}>KELP</PoppinsMedium>
          </View>
        </View>
        <Button
          onPress={async () => {
            // await
            await onComplete();
          }}
          size="giant"
          style={{
            width: '100%',
            marginTop: 20,
          }}>
          Confirm
        </Button>
      </View>
    </View>
  );
};

export default ConfirmKelpPurchase;
