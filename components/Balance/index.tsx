import React from 'react';

import KelpIcon from '../../assets/icons/KelpIcon';
import { PoppinsBold, PoppinsMedium } from '../../components/StyledText';
import styles from './styles';

export default function Balance() {
  return (
    <>
      <KelpIcon />
      <PoppinsBold style={styles.balance}>100,000</PoppinsBold>
      <PoppinsMedium style={styles.precision}>.00</PoppinsMedium>
    </>
  );
}
