import { BlurView } from 'expo-blur';
import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';

import ActionButton from '../ActionButton';
import { styles } from './styles';

export default function ForceUpdateAppModal(): JSX.Element {
  const [visible, setVisible] = useState<boolean>(false);

  const [apiVersion, setApiVersion] = useState<string>('1.0');

  const onDismiss = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (parseFloat(Constants?.manifest?.version) < parseFloat(apiVersion)) {
      setVisible(true);
    }
  }, []);

  const onPressOkButton = () => {};

  const onPressRemindmeLateButton = () => {
    onDismiss();
  };

  return (
    <Modal
      // useNativeDriver={true}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropOpacity={0.1}
      style={{ margin: 0 }}
      isVisible={visible}>
      <BlurView intensity={90} tint="dark" style={styles.screenContainer}>
        <View style={styles.screenWrapper}>
          <View style={styles.mainView}>
            <Text style={styles.txtPopupTitle}>
              There is newer version of this application available, click OK to upgrade now?
            </Text>
            <View style={styles.buttonMainView}>
              <ActionButton
                onPress={onPressRemindmeLateButton}
                title={'Reminde Later'}
                style={{ marginRight: 5 }}
              />
              <ActionButton onPress={onPressOkButton} title={'OK'} />
            </View>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
}
