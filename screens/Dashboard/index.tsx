import { Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import Balance from '../../components/Balance';
import Chart from '../../components/Chart';
import { data } from '../../components/Chart/mockData';
import { PoppinsBold } from '../../components/StyledText';
import { View } from '../../components/Themed';
import VTFPanel from '../../components/VTFPanel';
import styles from './styles';

interface Props {
  setScale: () => void;
  isScale: boolean;
  label: string;
}

const ChartScaleButton: React.FC<Props> = ({ setScale, isScale, label }) => {
  return (
    <TouchableOpacity
      style={isScale ? styles.scaleButtonScaled : styles.scaleButton}
      onPress={setScale}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export default function DashboardScreen() {
  const [isDay, setIsDay] = useState(true);
  const [isWeek, setIsWeek] = useState(false);
  const [isMonth, setIsMonth] = useState(false);
  const [isYear, setIsYear] = useState(false);
  const [isAll, setIsAll] = useState(false);

  const setDayScale = () => {
    setIsDay(true);
    setIsWeek(false);
    setIsMonth(false);
    setIsYear(false);
    setIsAll(false);
  };

  const setWeekScale = () => {
    setIsDay(false);
    setIsWeek(true);
    setIsMonth(false);
    setIsYear(false);
    setIsAll(false);
  };

  const setMonthScale = () => {
    setIsDay(false);
    setIsWeek(false);
    setIsMonth(true);
    setIsYear(false);
    setIsAll(false);
  };

  const setYearScale = () => {
    setIsDay(false);
    setIsWeek(false);
    setIsMonth(false);
    setIsYear(true);
    setIsAll(false);
  };

  const setAllScale = () => {
    setIsDay(false);
    setIsWeek(false);
    setIsMonth(false);
    setIsYear(false);
    setIsAll(true);
  };

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <View style={styles.container}>
        <View style={styles.balanceWrapper}>
          <Balance />
        </View>
        <View style={styles.marketValueWrapper}>
          <PoppinsBold style={styles.marketValue}>$ 632,750 USD</PoppinsBold>
        </View>
        <View style={styles.chartWrapper}>
          <Chart
            data={data}
            pathColor="#fff"
            width={1.5}
            cursorCrosshair={true}
            cursorLine={true}
            height={200}
          />
        </View>
        <View style={styles.scaleWrapper}>
          <ChartScaleButton setScale={setDayScale} isScale={isDay} label="Day" />
          <ChartScaleButton setScale={setWeekScale} isScale={isWeek} label="Week" />
          <ChartScaleButton setScale={setMonthScale} isScale={isMonth} label="Month" />
          <ChartScaleButton setScale={setYearScale} isScale={isYear} label="Year" />
          <ChartScaleButton setScale={setAllScale} isScale={isAll} label="All" />
        </View>
        <VTFPanel />
        {/* Use a light status bar on iOS to account for the black space above the modal */}
      </View>
    </SafeAreaProvider>
  );
}
