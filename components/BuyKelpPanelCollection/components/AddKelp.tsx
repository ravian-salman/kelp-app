import { useWalletConnect } from '@walletconnect/react-native-dapp';
import React, { useCallback, useEffect } from 'react';
import { Pressable, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import SwapIcon from '../../../assets/images/icons/swap.svg';
import Colors from '../../../constants/Colors';
import { responsiveScale, WINDOW_HEIGHT } from '../../../constants/Layout';
import useColorScheme from '../../../hooks/useColorScheme';
import { uiActions } from '../../../redux/reducer';
import { buyKelpActions } from '../../../redux/reducer/buyKelp';
import { myBalance } from '../../../utils/contracts/interactionFirst';
import { getBnbPrice } from '../../../utils/contracts/interactionSecond';
import KeyPad from '../../KeyPad';
import { PoppinsBold, PoppinsRegular } from '../../StyledText';
import { Button, View } from '../../Themed';
import { AddKelpStyles as styles } from './styles';

function AddKelp({ onComplete }: { onComplete: () => void }): JSX.Element {
  const colorScheme = useColorScheme();

  const dispatch = useDispatch();
  const connector = useWalletConnect();
  const bnbBalance = useSelector((state: any) => state.UI.userBalance);
  const temporaryAmount = useSelector((state: any) => state.BUYKELPSLICE.temporaryAmount);
  const selectedIndex = useSelector((state: any) => state.BUYKELPSLICE.selectedIndex);
  const amount = useSelector((state: any) => state.BUYKELPSLICE.amount);
  const isBnbAmount = useSelector((state: any) => state.BUYKELPSLICE.isBnbAmount);
  const usdBalance = useSelector((state: any) => state.BUYKELPSLICE.originalDollarBalance);

  // TODO: Get user available token
  const getToken = async () => {
    const staticAddress = connector?.accounts[0];
    const bnbData = await myBalance(staticAddress);
    const bnbExactPrice = await getBnbPrice();
    dispatch(buyKelpActions.SetBNBPrice(bnbExactPrice));
    dispatch(uiActions.SetUserBalance(bnbData ? bnbData.toString() : 0));
    dispatch(buyKelpActions.SetAddress(staticAddress));
  };

  useEffect(() => {
    getToken();
  }, []);

  const bnbPrice = useSelector((state: any) => state.BUYKELPSLICE.bnbPrice);

  function rightToLeftDigitArrange(digit = '0', decimalCount = 2) {
    const arrTotalDigits = digit?.split('');

    if (arrTotalDigits?.length < decimalCount + 1) {
      return `0.${[...Array(decimalCount).keys()]
        ?.reverse()
        .map((data) => arrTotalDigits?.[arrTotalDigits?.length - (data + 1)] ?? 0)
        .join('')}`;
    }

    const arrTotalAfterRemovedDigits = digit?.split('');
    arrTotalAfterRemovedDigits.splice(arrTotalDigits?.length - decimalCount, decimalCount);

    return `${arrTotalAfterRemovedDigits.join('')}.${[...Array(decimalCount).keys()]
      ?.reverse()
      .map((data) => arrTotalDigits?.[arrTotalDigits?.length - (data + 1)] ?? 0)
      .join('')}`;
  }

  const handleChangeAmount = useCallback(
    (value: any) => {
      dispatch(buyKelpActions.SetSelectedIndex(null));
      if (
        temporaryAmount === '' ||
        temporaryAmount === '0.00' ||
        temporaryAmount === '0.00000000'
      ) {
        if (isBnbAmount) {
          dispatch(buyKelpActions.SetOriginalBnbBalance(`${value}`));
          dispatch(buyKelpActions.SetTemporaryAmount(`${value}`));
        } else {
          dispatch(buyKelpActions.SetOriginalDollarBalance(`${value}`));
          dispatch(buyKelpActions.SetTemporaryAmount(`${value}`));
        }
        return;
      }

      if (isBnbAmount) {
        dispatch(buyKelpActions.SetOriginalBnbBalance(`${temporaryAmount}${value}`));
        dispatch(buyKelpActions.SetTemporaryAmount(`${temporaryAmount}${value}`));
      } else {
        dispatch(buyKelpActions.SetOriginalDollarBalance(`${temporaryAmount}${value}`));
        dispatch(buyKelpActions.SetTemporaryAmount(`${temporaryAmount}${value}`));
      }
    },
    [temporaryAmount, isBnbAmount]
  );

  const handleBackSpace = useCallback(() => {
    const erasedAmount = `${temporaryAmount}`.slice(0, -1);
    if (erasedAmount === '' || temporaryAmount === '0.00' || temporaryAmount === '0.00000000') {
      if (isBnbAmount) {
        dispatch(buyKelpActions.SetOriginalBnbBalance('0.00000000'));
        dispatch(buyKelpActions.SetTemporaryAmount('0.00000000'));
        return;
      }
      dispatch(buyKelpActions.SetOriginalBnbBalance('0.00'));
      dispatch(buyKelpActions.SetTemporaryAmount('0.00'));
      return;
    }
    dispatch(buyKelpActions.SetSelectedIndex(null));
    if (isBnbAmount) {
      dispatch(buyKelpActions.SetOriginalBnbBalance(erasedAmount));
      dispatch(buyKelpActions.SetTemporaryAmount(erasedAmount));
    } else {
      dispatch(buyKelpActions.SetOriginalDollarBalance(erasedAmount));
      dispatch(buyKelpActions.SetTemporaryAmount(erasedAmount));
    }
  }, [amount, isBnbAmount, temporaryAmount]);

  const devideAmount = (data = '', by = 0) => {
    if (isBnbAmount) {
      dispatch(buyKelpActions.SetOriginalDollarBalance(`${parseFloat(data) / by}`));
      dispatch(buyKelpActions.SetOriginalBnbBalance(`${parseFloat(data) / by}`));
      dispatch(buyKelpActions.SetTemporaryAmount(`${(parseFloat(data) / by).toFixed(8)}`));
      dispatch(buyKelpActions.SetAmount(`${(parseFloat(data) / by).toFixed(8)}`.replace('.', '')));
    } else {
      dispatch(buyKelpActions.SetOriginalDollarBalance(`${parseFloat(data) / by}`));
      dispatch(buyKelpActions.SetTemporaryAmount(`${(parseFloat(data) / by).toFixed(5)}`));
      dispatch(buyKelpActions.SetAmount(`${(parseFloat(data) / by).toFixed(2)}`.replace('.', '')));
    }
  };

  const bnbToDollar = () => {
    const temp = Number(temporaryAmount) ? temporaryAmount : 0;
    dispatch(buyKelpActions.SetOriginalDollarBalance(`${parseFloat(temp) * bnbPrice}`));
    dispatch(
      buyKelpActions.SetTemporaryAmount(parseFloat(`${parseFloat(temp) * bnbPrice}`).toFixed(5))
    );
  };

  const dollarToBnb = () => {
    const temp = Number(temporaryAmount) ? temporaryAmount : 0;
    dispatch(buyKelpActions.SetOriginalBnbBalance(`${parseFloat(temp) / bnbPrice}`));
    dispatch(
      buyKelpActions.SetTemporaryAmount(parseFloat(`${parseFloat(temp) / bnbPrice}`).toFixed(8))
    );
  };

  const onPressSwitchIcon = () => {
    if (isBnbAmount) {
      bnbToDollar();
    } else {
      dollarToBnb();
    }
    dispatch(buyKelpActions.SetIsBnbAmount(!isBnbAmount));
  };

  const onPressMin = () => {
    if (isBnbAmount) {
      devideAmount(bnbBalance, 4);
    } else {
      devideAmount((Number(bnbBalance) * 0.001).toString(), 4);
    }
    dispatch(buyKelpActions.SetSelectedIndex(0));
  };

  const onPressHalf = () => {
    if (isBnbAmount) {
      devideAmount(bnbBalance, 2);
    } else {
      devideAmount((Number(bnbBalance) * 0.001).toString(), 2);
    }
    dispatch(buyKelpActions.SetSelectedIndex(1));
  };

  const onPressAll = () => {
    if (isBnbAmount) {
      devideAmount(bnbBalance, 1);
    } else {
      devideAmount((Number(bnbBalance) * 0.001).toString(), 1);
    }
    dispatch(buyKelpActions.SetSelectedIndex(2));
  };

  const checkButtonStatus = (index = 0) => {
    return index === selectedIndex
      ? Colors[colorScheme].text
      : Colors[colorScheme].contentSecondary;
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'rgba(0,0,0,0.65)'} barStyle="dark-content" />

      <View style={{ flex: 1 }}>
        {/* Heading */}
        <PoppinsBold
          style={[
            styles.headingText,
            { color: Colors[colorScheme].brandLightGreen, fontSize: responsiveScale(13) },
          ]}>
          Buy Kelp
        </PoppinsBold>
        {/* Value Info */}
        <View style={styles.space} />
        <View style={styles.valueContainer}>
          <View style={styles.valuePrimaryWrapper}>
            <View style={styles.txtAmountValue}>
              <PoppinsBold style={styles.valuePrimaryText} numberOfLines={1} adjustsFontSizeToFit>
                {!isBnbAmount ? '$' : ''}
                {temporaryAmount}{' '}
                <PoppinsBold
                  style={[styles.bnbText, { color: Colors[colorScheme].contentSecondary }]}
                  numberOfLines={1}
                  adjustsFontSizeToFit>
                  {isBnbAmount ? 'BNB' : ''}
                </PoppinsBold>
              </PoppinsBold>
            </View>

            <View style={styles.valuePrimaryIconContainer}>
              <Pressable
                onPress={() => {
                  onPressSwitchIcon();
                }}>
                <SwapIcon style={styles.valuePrimaryIcon} />
              </Pressable>
            </View>
          </View>
          <View style={styles.bnbBalanceView}>
            <PoppinsRegular style={styles.valueSecondaryText}>
              BNB Balance: {bnbBalance ? bnbBalance : 0}
            </PoppinsRegular>
          </View>
        </View>

        {/* Additional Interactions */}
        <View style={styles.additionalInteractionContainer}>
          <PoppinsBold
            onPress={onPressMin}
            style={[
              styles.interactionText,
              {
                color: checkButtonStatus(0),
              },
            ]}>
            MIN
          </PoppinsBold>

          <PoppinsBold
            onPress={onPressHalf}
            style={[
              styles.interactionText,
              {
                color: checkButtonStatus(1),
              },
            ]}>
            HALF
          </PoppinsBold>

          <PoppinsBold
            onPress={onPressAll}
            style={[
              styles.interactionText,
              {
                color: checkButtonStatus(2),
              },
            ]}>
            All
          </PoppinsBold>
        </View>
        {/* Button Container */}
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              onComplete();
            }}
            size="giant"
            disabled={!(usdBalance <= bnbBalance)}
            style={{
              width: '90%',
            }}>
            Buy
          </Button>
        </View>
      </View>
      <View>
        <KeyPad
          onPress={handleChangeAmount}
          onBackSpace={handleBackSpace}
          extraButtonText="."
          keyBoardHeight={WINDOW_HEIGHT / 2 - 80}
        />
      </View>
    </View>
  );
}

export default AddKelp;
