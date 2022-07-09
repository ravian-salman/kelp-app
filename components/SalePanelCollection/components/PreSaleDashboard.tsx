import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { ethers } from 'ethers';
import Constants from 'expo-constants';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import BNBIcon from '../../../assets/images/icons/bnb.svg';
import KelpIcon from '../../../assets/images/icons/kelp.svg';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useMarketingContext } from '../../../hooks/useMarketing';
import { useWalletContext } from '../../../hooks/useWallet';
import { RootStackScreenProps } from '../../../navigation/types';
import { clipDecimal } from '../../../utils/currency';
import CountdownTimer from '../../CountdownTimer';
import { PoppinsBold, PoppinsRegular } from '../../StyledText';
import { Button, SafeAreaView, View } from '../../Themed';
import WConnectedModal from '../../WConnectedModal';
import { PrivateSaleDashboardStyles as styles } from './styles';
import 'react-native-get-random-values';
import '@ethersproject/shims';

const formatter = Intl.NumberFormat('en', { notation: 'compact' });

export default function PreSaleDashboard({
  navigation,
}: RootStackScreenProps<'SaleDashboard'>): JSX.Element {
  const connector = useWalletConnect();
  const colorScheme = useColorScheme();
  const { airdropConfig } = useMarketingContext();
  const { address, provider } = useWalletContext();

  const [amountRaised, setAmountRaised] = useState(1412456.57);
  const [kelpBalance, setKelpBalance] = useState(0.0);
  const [kelpValue, setKelpValue] = useState(0.001);
  const [bnbValue, setBnbValue] = useState(830.23);
  const [bnbBalance, setBnbBalance] = useState(0.0);
  const [connectedModalVisible, setConnectedModalVisible] = useState<boolean>(false);
  useEffect(() => {
    // calaulate bnb balance
    console.log('-------------------------PreSaleDashboard--------------------------');
    try {
      if (address) {
        console.log('address==== ', address);

        provider.getBalance(address + '').then(async (res) => {
          const bnb = ethers.utils.formatEther(res);
          setBnbBalance(Number(bnb));
        });
      }
    } catch (error) {
      console.log(error);
    }

    //calculate token balance
    try {
      if (address) {
        const contractAddress = Constants.manifest.extra.TOKEN_CONTRACT_ADDRESS;
        //console.log("contractAddress:",contractAddress,"\nprovider:",provider);
        const tokenContract = new ethers.Contract(
          contractAddress,
          [
            {
              inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
              name: 'balanceOf',
              outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
              stateMutability: 'view',
              type: 'function',
            },
          ],
          provider
        );
        //console.log("tokenContract:",tokenContract);

        tokenContract.balanceOf(address).then(async (result) => {
          const kelp = await ethers.utils.formatEther(result);
          const tokenAmount = Number(kelp) * 1000000000000000000;
          setKelpBalance(tokenAmount);
        });

        console.log('-----------------------/tokenContract/-------------');
      }
    } catch (err) {}
  }, [address]);

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
              Pre Sale
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
                  fill={(amountRaised / 2000000) * 100}
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
                          {clipDecimal(amountRaised)[0]}
                        </PoppinsBold>
                        <PoppinsBold
                          style={[
                            styles.progressBarSecondaryAmount,
                            {
                              color: Colors[colorScheme].brandLightGreen,
                            },
                          ]}>
                          {clipDecimal(amountRaised)[1]}
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
                    <PoppinsBold style={styles.currencyTitlePrimary}>{kelpBalance}</PoppinsBold>
                    <PoppinsBold
                      style={[
                        styles.currencyTitleSecondary,
                        { color: Colors[colorScheme].contentSecondary },
                      ]}>
                      ${kelpValue}
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
                    <PoppinsBold style={styles.currencyTitlePrimary}>{bnbBalance}</PoppinsBold>
                    <PoppinsBold
                      style={[
                        styles.currencyTitleSecondary,
                        { color: Colors[colorScheme].contentSecondary },
                      ]}>
                      ${clipDecimal(bnbValue)[0]}
                      {clipDecimal(bnbValue)[1]}
                    </PoppinsBold>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
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
