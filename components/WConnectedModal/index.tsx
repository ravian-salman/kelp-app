import { Icon } from '@ui-kitten/components';
import { BlurView } from 'expo-blur';
import * as React from 'react';
import { Pressable } from 'react-native';
import Modal from 'react-native-modal';
import { RootSiblingParent } from 'react-native-root-siblings';
import { useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { uiActions } from '../../redux/reducer';
import { PoppinsBold, PoppinsRegular } from '../StyledText';
import { View, Button } from '../Themed';
import { styles } from './styles';

export default function WConnectedModal({
  connectedModalVisible,
  setConnectedModalVisible,
  connector,
}: {
  connectedModalVisible: boolean;
  setConnectedModalVisible: (visible: boolean) => void;
  connector: any;
}): JSX.Element {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();

  const killSession = React.useCallback(() => {
    setConnectedModalVisible(!connectedModalVisible);
    dispatch(uiActions.setInitial());
    return connector.killSession();
  }, [connector, connectedModalVisible, setConnectedModalVisible]);

  return (
    <Modal
      useNativeDriver={true}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropOpacity={0.1}
      style={{ margin: 0 }}
      isVisible={connectedModalVisible}>
      <BlurView intensity={90} tint="dark" style={styles.screenContainer}>
        {/* RootSiblingParent is needed here in order to render the toast on top of the modal */}
        <RootSiblingParent>
          <View style={styles.screenWrapper}>
            {/* Close Modal Button */}
            <View style={styles.iconContainer}>
              <Pressable onPress={() => setConnectedModalVisible(!connectedModalVisible)}>
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
                Your Connected Wallet
              </PoppinsBold>
            </View>
            <View style={styles.walletsContainer}>
              <PoppinsRegular style={styles.content}>{connector?.accounts}</PoppinsRegular>
            </View>
            <View style={styles.buttonContainer}>
              <Button size="giant" style={styles.button} onPress={killSession}>
                Disconnect
              </Button>
            </View>
          </View>
        </RootSiblingParent>
      </BlurView>
    </Modal>
  );
}
