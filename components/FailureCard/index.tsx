import { Button } from '@ui-kitten/components';
import React from 'react';

import ClaimScreenImage2 from '../../assets/images/claim/screen-1.svg';
import { View, Text } from '../Themed';
import styles from './styles';

export default function FailureCard() {
  return (
    <View style={styles.cardContainer}>
      <View>
        <View style={styles.imageContainer}>
          <ClaimScreenImage2 preserveAspectRatio="xMidYMax" height={234} width={234} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title} lightColor="#47d6a2">
            Sorry :{'('}
          </Text>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Unfortunately, you were not on the list for the AirDrop but you can still setup the
            wallet.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button style={styles.button}>NEXT</Button>
        </View>
      </View>
    </View>
  );
}
