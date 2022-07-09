import { Icon } from '@ui-kitten/components';
import {
  RenderQrcodeModalProps,
  WalletService,
  WalletServiceIcon,
} from '@walletconnect/react-native-dapp';
import { BlurView } from 'expo-blur';
import * as React from 'react';
import { TouchableOpacity, Pressable, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { RootSiblingParent } from 'react-native-root-siblings';

import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { PoppinsBold } from '../StyledText';
import { View } from '../Themed';
import { styles } from './styles';

export default function WConnectModal({
  walletServices,
  visible,
  connectToWalletService,
  uri,
  onDismiss,
}: RenderQrcodeModalProps): JSX.Element {
  const renderContent = React.useCallback(() => {
    return (
      <View style={styles.walletsContainer}>
        {walletServices.map(
          (walletService: WalletService, i: number) =>
            i <= 7 && (
              <TouchableOpacity
                key={`i${i}`}
                onPress={() => connectToWalletService(walletService, uri)}>
                <View style={styles.walletWrapper}>
                  <PoppinsBold style={{ fontSize: 20 }}>{walletService.name}</PoppinsBold>
                  <WalletServiceIcon
                    width={60}
                    height={60}
                    key={`i${i}`}
                    walletService={walletService}
                    connectToWalletService={() => connectToWalletService(walletService, uri)}
                  />
                </View>
              </TouchableOpacity>
            )
        )}
      </View>
    );
  }, [walletServices, uri]);
  const colorScheme = useColorScheme();

  return (
    <Modal
      // useNativeDriver={true}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropOpacity={0.1}
      style={{ margin: 0 }}
      isVisible={visible}>
      <BlurView intensity={90} tint="dark" style={styles.screenContainer}>
        {/* RootSiblingParent is needed here in order to render the toast on top of the modal */}
        <RootSiblingParent>
          <View style={styles.screenWrapper}>
            {/* Close Modal Button */}
            <View style={styles.iconContainer}>
              <Pressable onPress={onDismiss}>
                <View
                  style={[
                    styles.iconWrapper,
                    {
                      backgroundColor: Colors[colorScheme].brandLightGreen,
                    },
                  ]}>
                  <Icon
                    style={{
                      width: 30,
                      height: 30,
                    }}
                    name="close-outline"
                    fill="#fff"
                  />
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
                Connect Wallet
              </PoppinsBold>
            </View>
            <ScrollView style={{ width: '100%' }}>{renderContent()}</ScrollView>
          </View>
        </RootSiblingParent>
      </BlurView>
    </Modal>
  );
}
