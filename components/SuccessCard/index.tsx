import React from 'react';

import ClaimScreenImage2 from '../../assets/images/claim/screen-2.svg';
import { View, Text, Button } from '../Themed';
import styles from './styles';

type SuccessCardProps = {
  handleNextScreen: () => void;
};

export default function SuccessCard({ handleNextScreen }: SuccessCardProps) {
  return (
    <View style={styles.cardContainer}>
      <View>
        <View style={styles.imageContainer}>
          <ClaimScreenImage2 preserveAspectRatio="xMidYMax" height={234} width={234} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title} lightColor="#47d6a2">
            Congratulations!
          </Text>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            100,000 Kelp will be deposited to your Kelp Wallet.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button size="giant" onPress={handleNextScreen} style={styles.button}>
            Next
          </Button>
        </View>
      </View>
    </View>
  );
}
