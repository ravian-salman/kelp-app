import { Icon } from '@ui-kitten/components';
import React from 'react';
import { Pressable } from 'react-native';

import BankIcon from '../../../assets/images/icons/bank.svg';
import BNBIcon from '../../../assets/images/icons/bnb.svg';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { PoppinsBold } from '../../StyledText';
import { View } from '../../Themed';
import { PaymentMethodStyles as styles } from './styles';


const PaymentMethod = ({ onBack }: { onBack: () => void }) => {
  const colorScheme = useColorScheme();

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
            Select Payment Method
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
        <Pressable>
          <View style={styles.cardContainer}>
            <View style={styles.iconContainer}>
              <BNBIcon height={34} width={34} />
            </View>
            <View style={styles.methodTitleWrapper}>
              <PoppinsBold style={styles.methodTitle}>BNB</PoppinsBold>
              <PoppinsBold
                style={{
                  fontSize: 14,
                  color: Colors[colorScheme].contentSecondary,
                }}>
                BEP-20
              </PoppinsBold>
            </View>
            <View style={styles.secondaryInfoContainer}>
              <View style={styles.secondaryInfoWrapper}>
                <PoppinsBold style={styles.methodTitle}>0.00</PoppinsBold>
                <PoppinsBold
                  style={{
                    fontSize: 14,
                    color: Colors[colorScheme].contentSecondary,
                  }}>
                  $0.00
                </PoppinsBold>
              </View>
            </View>
          </View>
        </Pressable>

        {/* Moon Pay */}
        <Pressable
          style={{
            marginTop: 10,
          }}>
          <View style={styles.cardContainer}>
            <View style={styles.iconContainer}>
              <BNBIcon height={34} width={34} />
            </View>
            <View style={styles.methodTitleWrapper}>
              <PoppinsBold style={styles.methodTitle}>Moonpay</PoppinsBold>
              <PoppinsBold
                style={{
                  fontSize: 14,
                  color: Colors[colorScheme].contentSecondary,
                }}>
                CREDIT CARD
              </PoppinsBold>
            </View>
          </View>
        </Pressable>

        {/* Bank Transfer */}
        <Pressable
          style={{
            marginTop: 10,
          }}>
          <View style={styles.cardContainer}>
            <View style={styles.iconContainer}>
              <BankIcon height={34} width={34} />
            </View>
            <View style={styles.methodTitleWrapper}>
              <PoppinsBold style={styles.methodTitle}>Bank Transfer</PoppinsBold>
              <PoppinsBold
                style={{
                  fontSize: 14,
                  color: Colors[colorScheme].contentSecondary,
                }}>
                WIRE TRANSFER
              </PoppinsBold>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default PaymentMethod;
