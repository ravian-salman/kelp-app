import { Icon } from '@ui-kitten/components';
import { BlurView } from 'expo-blur';
import React, { useMemo, useState } from 'react';
import { Pressable } from 'react-native';
import { useDispatch } from 'react-redux';

import { AddKelp } from '../../components/BuyKelpPanelCollection';
import ConfirmKelpPurchase from '../../components/BuyKelpPanelCollection/components/ConfirmKelpPurchase';
import PurchaseCompleteModal from '../../components/BuyKelpPanelCollection/components/PurchaseCompleteModal';
import { View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { RootStackScreenProps } from '../../navigation/types';
import { buyKelpActions } from '../../redux/reducer/buyKelp';
import { BuyKelpModalScreenStyles as styles } from './styles';

enum ScreenVariant {
  ADD_KELP = 'ADD_KELP',
  PAYMENT_METHOD = 'PAYMENT_METHOD',
}

export default function BuyKelpModalScreen({
  navigation,
}: RootStackScreenProps<'BuyKelpModal'>): JSX.Element {
  const dispatch = useDispatch();

  const [activeScreenVariant, setActiveScreenVariant] = useState<ScreenVariant>(
    ScreenVariant.ADD_KELP
  );
  const [isCompletePayment, setIsCompletePayment] = useState<boolean>(false);

  const colorScheme = useColorScheme();
  const modalContent = useMemo(() => {
    switch (activeScreenVariant) {
      case ScreenVariant.ADD_KELP:
        return (
          <AddKelp
            onComplete={() => {
              setActiveScreenVariant(ScreenVariant.PAYMENT_METHOD);
            }}
          />
        );
      case ScreenVariant.PAYMENT_METHOD:
        return (
          <ConfirmKelpPurchase
            onBack={() => setActiveScreenVariant(ScreenVariant.ADD_KELP)}
            onComplete={() => {
              setIsCompletePayment(true);
              dispatch(buyKelpActions.setInitial());
            }}
          />
        );
      // return <PaymentMethod onBack={() => setActiveScreenVariant(ScreenVariant.ADD_KELP)} />;
      default:
        return null;
    }
  }, [activeScreenVariant]);

  return (
    <BlurView intensity={90} tint="dark" style={styles.screenContainer}>
      <View style={styles.screenWrapper}>
        <View style={styles.iconContainer}>
          {/* Close Modal Button */}
          <Pressable
            onPress={() => {
              navigation.pop();
              dispatch(buyKelpActions.setInitial());
            }}>
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
        <View
          style={{
            marginTop: 50,
            width: '100%',
            flex: 1,
          }}>
          {modalContent}
        </View>
      </View>
      <PurchaseCompleteModal
        onClose={() => {
          navigation.goBack();
          setIsCompletePayment(false);
        }}
        isVisible={isCompletePayment}
      />
    </BlurView>
  );
}
