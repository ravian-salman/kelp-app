import React, { useEffect, useState } from 'react';

import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { dateParser, numberSplitter } from '../../utils/date';
import { PoppinsBold } from '../StyledText';
import { View } from '../Themed';
import { CountdownTimeStyles as styles } from './styles';

export type CountdownTimerProps = {
  date: Date;
  onTimerComplete?: () => void;
};

export default function CountdownTimer({ date, onTimerComplete }: CountdownTimerProps) {
  const colorScheme = useColorScheme();

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(() => {
    const milliSecondsDif = date ? date.getTime() - new Date().getTime() : null;

    return milliSecondsDif ? dateParser(milliSecondsDif) : null;
  });

  useEffect(() => {
    if (timeLeft === null) {
      onTimerComplete?.();
    }
  }, [timeLeft]);

  useEffect(() => {
    const intervalHandle = setInterval(() => {
      const milliSecondsDif = date ? date.getTime() - new Date().getTime() : null;

      setTimeLeft(milliSecondsDif ? dateParser(milliSecondsDif) : null);
    }, 1000);

    return () => {
      clearInterval(intervalHandle);
    };
  }, []);

  return (
    <View style={styles.countdownContainer}>
      <View>
        <View style={styles.numberCardWrapper}>
          {numberSplitter(Math.abs(timeLeft?.days) as number, 2).map((value, idx) => (
            <View
              key={idx}
              style={[
                styles.numberCard,
                {
                  marginLeft: idx === 0 ? 0 : 4,
                },
              ]}>
              <PoppinsBold style={styles.countdownMainText}>
                {timeLeft?.days > 0 ? value : 0}
              </PoppinsBold>
            </View>
          ))}
        </View>
        <PoppinsBold
          style={[styles.countdownSecondaryText, { color: Colors[colorScheme].contentSecondary }]}>
          DAYS
        </PoppinsBold>
      </View>
      <View>
        <View style={styles.numberCardWrapper}>
          {numberSplitter(Math.abs(timeLeft?.hours) as number, 2).map((value, idx) => (
            <View
              key={idx}
              style={[
                styles.numberCard,
                {
                  marginLeft: idx === 0 ? 0 : 4,
                },
              ]}>
              <PoppinsBold style={styles.countdownMainText}>
                {timeLeft?.hours > 0 ? value : 0}
              </PoppinsBold>
            </View>
          ))}
        </View>
        <PoppinsBold
          style={[styles.countdownSecondaryText, { color: Colors[colorScheme].contentSecondary }]}>
          HOURS
        </PoppinsBold>
      </View>
      <View>
        <View style={styles.numberCardWrapper}>
          {numberSplitter(Math.abs(timeLeft?.minutes) as number, 2).map((value, idx) => (
            <View
              key={idx}
              style={[
                styles.numberCard,
                {
                  marginLeft: idx === 0 ? 0 : 4,
                },
              ]}>
              <PoppinsBold style={styles.countdownMainText}>
                {timeLeft?.minutes > 0 ? value : 0}
              </PoppinsBold>
            </View>
          ))}
        </View>
        <PoppinsBold
          style={[styles.countdownSecondaryText, { color: Colors[colorScheme].contentSecondary }]}>
          MINUTES
        </PoppinsBold>
      </View>
      <View>
        <View style={styles.numberCardWrapper}>
          {numberSplitter(Math.abs(timeLeft?.seconds) as number, 2).map((value, idx) => (
            <View
              key={idx}
              style={[
                styles.numberCard,
                {
                  marginLeft: idx === 0 ? 0 : 4,
                },
              ]}>
              <PoppinsBold style={styles.countdownMainText}>
                {timeLeft?.seconds > 0 ? value : 0}
              </PoppinsBold>
            </View>
          ))}
        </View>
        <PoppinsBold
          style={[styles.countdownSecondaryText, { color: Colors[colorScheme].contentSecondary }]}>
          SECONDS
        </PoppinsBold>
      </View>
    </View>
  );
}
