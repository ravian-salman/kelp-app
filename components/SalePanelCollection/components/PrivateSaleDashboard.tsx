import { useWalletConnect } from '@walletconnect/react-native-dapp';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useDispatch, useSelector } from 'react-redux';

import BNBIcon from '../../../assets/images/icons/bnb.svg';
import KelpIcon from '../../../assets/images/icons/kelp.svg';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useMarketingContext } from '../../../hooks/useMarketing';
import { RootStackScreenProps } from '../../../navigation/types';
import { clipDecimal } from '../../../utils/currency';
import CountdownTimer from '../../CountdownTimer';
import { PoppinsBold, PoppinsRegular } from '../../StyledText';
import { Button, SafeAreaView, View } from '../../Themed';
import WConnectedModal from '../../WConnectedModal';
import { PrivateSaleDashboardStyles as styles } from './styles';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import { getUserBalances, myBalance } from '../../../utils/contracts/interactionFirst';
import { buyKelpToken, getRate, getTotalSales } from '../../../utils/contracts/interactionSecond';
import { uiActions } from '../../../redux/reducer';
import { useWalletContext } from '../../../hooks/useWallet';

const formatter = Intl.NumberFormat('en', { notation: 'compact' });

export default function PrivateSaleDashboard({
  navigation,
}: RootStackScreenProps<'SaleDashboard'>): JSX.Element {
  const { address } = useWalletContext();
  // console.log('-----------------------------------', address);
  const connector = useWalletConnect();
  const colorScheme = useColorScheme();
  const { airdropConfig } = useMarketingContext();
  const [connectedModalVisible, setConnectedModalVisible] = useState<boolean>(false);

  const dispatch = useDispatch();

  // TODO: Get user available token
  const getToken = async () => {
    const staticAddress = connector?.accounts[0];
    const myDaat = await buyKelpToken(0.01, staticAddress);
    console.log('myDaat', myDaat);
    const bnbData = await myBalance(staticAddress);
    dispatch(uiActions.SetBnbBalnce(Number(bnbData)));

    const salesData = await getTotalSales(0);
    dispatch(uiActions.SetAmountRaised(Number(salesData)));

    const kelpData = await getUserBalances(staticAddress);
    dispatch(uiActions.SetKelpBalnce(Number(kelpData)));

    const kelpPrice = await getRate(0);
    dispatch(uiActions.SetKelpValue(Number(kelpData) * Number(kelpPrice)));

    dispatch(uiActions.SetBnbValue(Number(bnbData) * 0.0035));
  };

  const kelpBalance = useSelector((state: any) => state.UI.kelpBalance);
  const bnbBalance = useSelector((state: any) => state.UI.bnbBalance);
  const amountRaised = useSelector((state: any) => state.UI.amountRaised);
  const kelpValue = useSelector((state: any) => state.UI.kelpValue);
  const bnbValue = useSelector((state: any) => state.UI.bnbValue);

  useEffect(() => {
    connector.connected && getToken();
  }, [connector?.accounts]);

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(address.length - 4, address.length)}`;
  };

  const ConnectButton = ({ onPress }: any) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <PoppinsRegular
          style={[styles.headingSecondaryText, { color: Colors[colorScheme].contentSecondary }]}>
          Connect
        </PoppinsRegular>
      </TouchableOpacity>
    );
  };

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={Colors.light.background} barStyle="dark-content" />

      <View style={styles.cardContainer}>
        <View style={styles.contentContainer}>
          {/* Heading */}
          <View style={styles.headingContainer}>
            <PoppinsBold
              style={[styles.headingMainText, { color: Colors[colorScheme].brandLightGreen }]}>
              Private Sale
            </PoppinsBold>

            {!connector.connected ? (
              <ConnectButton onPress={connectWallet} label="Connect a wallet" />
            ) : (
              <TouchableOpacity onPress={() => setConnectedModalVisible(!connectedModalVisible)}>
                <PoppinsRegular
                  style={[
                    styles.headingSecondaryText,
                    { color: Colors[colorScheme].contentSecondary },
                  ]}>
                  {shortenAddress(connector?.accounts[0])}
                </PoppinsRegular>
              </TouchableOpacity>
            )}
          </View>

          <ScrollView style={{ flex: 1 }}>
            <View style={{ width: Dimensions.get('window').width }}>
              {/* Countdown */}
              {airdropConfig?.countdownTimer && (
                <CountdownTimer
                  date={moment(airdropConfig.countdownTimer).toDate()}
                  onTimerComplete={() => navigation.replace('Root')}
                />
              )}
              {/* Amount Raised */}
              <View style={styles.progressBarContainer}>
                <View style={styles.softCapContainer}>
                  <PoppinsBold
                    style={[
                      styles.progressBarText,
                      { color: Colors[colorScheme].contentSecondary },
                    ]}>
                    ${formatter.format(airdropConfig?.softCap || 0)} SOFT CAP
                  </PoppinsBold>
                </View>
                <AnimatedCircularProgress
                  style={{
                    height: Dimensions.get('window').width / 2,
                  }}
                  fill={
                    (amountRaised / 2000000) * amountRaised === 0
                      ? 1
                      : amountRaised > 100
                      ? 100
                      : 75
                  }
                  size={Dimensions.get('window').width - 50}
                  width={16}
                  backgroundWidth={8}
                  arcSweepAngle={180}
                  rotation={270}
                  fillLineCap="round"
                  lineCap="round"
                  duration={2500}
                  tintColor={Colors[colorScheme].brandLightGreen}
                  backgroundColor={Colors[colorScheme].contentSecondary}>
                  {() => (
                    <View style={styles.progressBarTextWrapper}>
                      <PoppinsBold
                        style={[
                          styles.progressBarText,
                          { color: Colors[colorScheme].contentSecondary },
                        ]}>
                        TOTAL RAISED
                      </PoppinsBold>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <PoppinsBold
                          style={[
                            styles.progressBarAmountSymbol,
                            {
                              color: Colors[colorScheme].brandLightGreen,
                            },
                          ]}>
                          $
                        </PoppinsBold>
                        <PoppinsBold
                          style={[
                            styles.progressBarPrimaryAmount,
                            {
                              color: Colors[colorScheme].brandLightGreen,
                            },
                          ]}>
                          {clipDecimal(amountRaised)[0] ? clipDecimal(amountRaised)[0] : '0'}
                        </PoppinsBold>
                        <PoppinsBold
                          style={[
                            styles.progressBarSecondaryAmount,
                            {
                              color: Colors[colorScheme].brandLightGreen,
                            },
                          ]}>
                          {clipDecimal(amountRaised)[1] ? clipDecimal(amountRaised)[1] : '00'}
                        </PoppinsBold>
                      </View>
                    </View>
                  )}
                </AnimatedCircularProgress>
                <View style={styles.hardCapCOntainer}>
                  <PoppinsBold
                    style={[
                      styles.progressBarText,
                      { color: Colors[colorScheme].contentSecondary },
                    ]}>
                    ${formatter.format(airdropConfig?.hardCap || 0)} HARD CAP
                  </PoppinsBold>
                </View>
              </View>
              {/* Kelp */}
              <View
                style={[
                  styles.tokenCardContainer,
                  {
                    marginTop: 25,
                  },
                ]}>
                <View style={styles.tokenCardWrapper}>
                  <View lightColor="#fff" style={styles.cardLeftContent}>
                    <View lightColor="#fff" style={styles.iconContainer}>
                      <KelpIcon width={'100%'} height={'100%'} />
                    </View>
                    <View lightColor="#fff">
                      <PoppinsBold style={styles.currencyTitlePrimary}>KELP</PoppinsBold>
                      <PoppinsBold
                        style={[
                          styles.currencyTitleSecondary,
                          { color: Colors[colorScheme].contentSecondary },
                        ]}>
                        KELP
                      </PoppinsBold>
                    </View>
                  </View>
                  <View lightColor="#fff" style={styles.cardRightContent}>
                    <PoppinsBold style={styles.currencyTitlePrimary}>
                      {kelpBalance ? kelpBalance : 0}
                    </PoppinsBold>
                    <PoppinsBold
                      style={[
                        styles.currencyTitleSecondary,
                        { color: Colors[colorScheme].contentSecondary },
                      ]}>
                      ${kelpValue ? kelpValue : 0}
                    </PoppinsBold>
                  </View>
                </View>
              </View>
              {/* BNB */}
              <View
                style={[
                  styles.tokenCardContainer,
                  {
                    marginTop: 15,
                    marginBottom: 25,
                  },
                ]}>
                <View style={styles.tokenCardWrapper}>
                  <View lightColor="#fff" style={styles.cardLeftContent}>
                    <View lightColor="#fff" style={styles.iconContainer}>
                      <BNBIcon width={'100%'} height={'100%'} />
                    </View>
                    <View lightColor="#fff">
                      <PoppinsBold style={styles.currencyTitlePrimary}>BNB</PoppinsBold>
                      <PoppinsBold
                        style={[
                          styles.currencyTitleSecondary,
                          { color: Colors[colorScheme].contentSecondary },
                        ]}>
                        Binance Smart Chain
                      </PoppinsBold>
                    </View>
                  </View>
                  <View lightColor="#fff" style={styles.cardRightContent}>
                    <PoppinsBold style={styles.currencyTitlePrimary}>
                      {bnbBalance ? bnbBalance : 0}
                    </PoppinsBold>
                    <PoppinsBold
                      style={[
                        styles.currencyTitleSecondary,
                        { color: Colors[colorScheme].contentSecondary },
                      ]}>
                      ${bnbValue ? bnbValue.toString().substring(0, 7) : 0}
                    </PoppinsBold>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate('marketing', { isShowPublicSale: true })}
            style={styles.button}>
            Action
          </Button>

          <Button
            onPress={() => navigation.navigate('BuyKelpModal')}
            style={[
              styles.button,
              {
                marginLeft: 10,
              },
            ]}>
            Buy
          </Button>
          <Button
            onPress={() => navigation.navigate('AddressModal')}
            style={[
              styles.button,
              {
                marginLeft: 10,
              },
            ]}>
            Deposit BNB
          </Button>
        </View>
      </View>
      <WConnectedModal
        connectedModalVisible={connectedModalVisible}
        setConnectedModalVisible={setConnectedModalVisible}
        connector={connector}
      />
    </SafeAreaView>
  );
}
