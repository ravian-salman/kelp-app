import * as React from 'react';
import { StyleSheet } from 'react-native';
import { LineChart } from 'react-native-wagmi-charts';

export interface Props {
  data: any;
  pathColor: string;
  width: number;
  cursorCrosshair?: boolean;
  cursorLine?: boolean;
  height: number;
}

function Chart({ data, pathColor, width, cursorCrosshair, cursorLine, height }: Props) {
  return (
    <LineChart.Provider data={data}>
      <LineChart height={height}>
        <LineChart.Path color={pathColor} width={width} />
        {cursorLine && <LineChart.CursorLine color={pathColor} />}
        {cursorCrosshair && (
          <LineChart.CursorCrosshair color={pathColor} size={6} outerSize={20}>
            <LineChart.Tooltip style={styles({ pathColor }).tooltip}>
              <LineChart.PriceText
                style={styles({ pathColor }).priceText}
                format={({ value }: any) => {
                  'worklet';
                  return `$${value}`;
                }}
                precision={4}
              />
              <LineChart.DatetimeText style={styles({ pathColor }).datetimeText} />
            </LineChart.Tooltip>
          </LineChart.CursorCrosshair>
        )}
      </LineChart>
    </LineChart.Provider>
  );
}

const styles: any = ({ pathColor }: Props) =>
  StyleSheet.create({
    tooltip: {
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: 25,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 10,
      paddingBottom: 10,
    },
    priceText: {
      color: pathColor,
      fontWeight: '600',
      fontSize: 15,
    },
    datetimeText: {
      color: pathColor,
      fontWeight: '400',
      fontSize: 13,
    },
  });

export default Chart;
