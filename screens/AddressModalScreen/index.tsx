import { Icon } from '@ui-kitten/components';
import { BlurView } from 'expo-blur';
import { setString } from 'expo-clipboard';
import React, { useCallback } from 'react';
import { Pressable, Share, StatusBar } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { RootSiblingParent } from 'react-native-root-siblings';

import CopyIcon from '../../assets/images/icons/copy.svg';
import ShareIcon from '../../assets/images/icons/share.svg';
import { PoppinsBold, PoppinsMedium } from '../../components/StyledText';
import { View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useWalletContext } from '../../hooks/useWallet';
import { RootStackScreenProps } from '../../navigation/types';
import { showSuccess } from '../../utils/toast';
import { AddressModalScreenStyles as styles } from './styles';

export default function AddressModalScreen({
  navigation,
}: RootStackScreenProps<'AddressModal'>): JSX.Element {
  const colorScheme = useColorScheme();
  const { address } = useWalletContext();
  console.log("----------------------AddressModalScreen----------------------");
  console.log("address", address);
  console.log("----------------------/AddressModalScreen/--------------------");
  const onShare = useCallback(
    async (text: string) => {
      try {
        const result = await Share.share({
          message: text,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        console.error('Failed to share');
      }
    },
    [address]
  );

  const copyToClipboard = useCallback(
    (text: string) => {
      setString(text);
      showSuccess('Address Copied');
    },
    [address]
  );

  return (
    <BlurView intensity={90} tint="dark" style={styles.screenContainer}>
      {/* RootSiblingParent is needed here in order to render the toast on top of the modal */}
      <StatusBar backgroundColor={'rgba(0,0,0,0.65)'} barStyle="dark-content" />

      <RootSiblingParent>
        <View style={styles.screenWrapper}>

          {/* Close Modal Button */}
          <View style={styles.iconContainer}>
            <Pressable onPress={() => navigation.pop()}>
              <View
                style={[
                  styles.iconWrapper,
                  {
                    backgroundColor: Colors[colorScheme].brandLightGreen,
                  },
                ]}>
                <Icon style={{
                width: 30,
                height: 30,
              }} name="close-outline" fill="#fff" />
              </View>
            </Pressable>
          </View>

          {/* Content */}
          <View style={styles.headingContainer}>
            <PoppinsBold
              style={[
                styles.heading,
                {
                  color: Colors[colorScheme].brandLightGreen,
                },
              ]}>
              Deposit Coins
            </PoppinsBold>
          </View>
          <View lightColor="#fff" style={styles.scannerContainer}>
            <QRCode size={220} value={address as string} />
          </View>
          <View style={styles.addressContainer}>
            <PoppinsMedium style={styles.addressText}>{address}</PoppinsMedium>
          </View>
          <View style={styles.bottomContainer}>
            <Pressable onPress={() => address && copyToClipboard(address)}>
              <View style={styles.bottomTextWrapper}>
                <View style={styles.bottomIconContainer}>
                  <CopyIcon width={'100%'} height={'100%'}/>
                </View>
                <PoppinsBold style={styles.bottomText}>Copy</PoppinsBold>
              </View>
            </Pressable>

            <View style={styles.divider} />

            <View>
              <Pressable onPress={() => address && onShare(address)}>
                <View style={styles.bottomTextWrapper}>
                  <View style={styles.bottomIconContainer}>
                    <ShareIcon width={'100%'} height={'100%'}/>
                  </View>
                  <PoppinsBold style={styles.bottomText}>Share</PoppinsBold>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </RootSiblingParent>
    </BlurView>
  );
}
