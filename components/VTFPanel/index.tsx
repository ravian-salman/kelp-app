import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { CountUp } from 'use-count-up';

import { getAirdopConfig } from '../../apis/airdropConfig';
import { PoppinsBold, PoppinsMedium } from '../../components/StyledText';
import { View } from '../../components/Themed';
import styles from './styles';

// [Performance] - Temporary workaround until we introduce the graphql subscription network
LogBox.ignoreLogs(['Setting a timer']);

export default function VTFPanel() {
  const queryClient = useQueryClient();
  const updateVtf = useMutation(getAirdopConfig, {
    onSuccess: () => {
      queryClient.invalidateQueries('airDropData');
    },
  });
  const { data } = useQuery('airDropData', getAirdopConfig);
  const { redistribution, percentage, lp } = data?.[0] || {};
  const decimal = Number((percentage % 1).toFixed(2).substring(2));

  useEffect(() => {
    const updatingVtf = setInterval(() => {
      updateVtf.mutate();
    }, 2000);
    return () => {
      clearInterval(updatingVtf);
    };
  }, []);

  return (
    <View>
      {data?.[0] && (
        <>
          <View style={styles.vtfPanelWrapper}>
            <View style={styles.redistributionWrapper}>
              <PoppinsBold style={styles.redistribution}>
                <CountUp isCounting end={redistribution} duration={3.2} />
              </PoppinsBold>
              <PoppinsMedium style={styles.subPoint}>%</PoppinsMedium>
            </View>
            <AnimatedCircularProgress
              style={styles.vtfWrapper}
              size={170}
              width={7}
              fill={redistribution}
              duration={2500}
              tintColor="#00e0ff"
              backgroundColor="#F1F1F0"
              backgroundWidth={20}
              tintColorSecondary="#46D6A2"
              arcSweepAngle={320}
              rotation={180}
              lineCap="round">
              {() => (
                <View style={styles.vtf}>
                  <PoppinsMedium style={styles.subPoint}>%</PoppinsMedium>
                  <PoppinsMedium style={styles.points}>
                    <CountUp isCounting end={Math.trunc(percentage)} duration={2.5} />
                  </PoppinsMedium>
                  {
                    <PoppinsMedium style={styles.subPoint}>
                      .<CountUp isCounting end={decimal} duration={2.5} />0
                    </PoppinsMedium>
                  }
                </View>
              )}
            </AnimatedCircularProgress>
            <View style={styles.lpWrapper}>
              <PoppinsBold style={styles.lp}>
                <CountUp isCounting end={lp} duration={3.2} />
              </PoppinsBold>
              <PoppinsMedium style={styles.subPoint}>%</PoppinsMedium>
            </View>
          </View>
          <View style={styles.labelsWrapper}>
            <View style={styles.redistributionLabel}>
              <PoppinsBold style={styles.labelText}>HOLDERS</PoppinsBold>
            </View>
            <View style={styles.vtfLabel}>
              <PoppinsBold style={styles.labelText}>TRANSACTION FEE</PoppinsBold>
            </View>
            <View style={styles.lpLabel}>
              <PoppinsBold style={styles.labelText}>LP</PoppinsBold>
            </View>
          </View>
        </>
      )}
    </View>
  );
}
