import React from 'react';

import { View } from '../Themed';

type PagerProgressBarPagerProgressBar = {
  length: number;
  index: number;
};

export default function PagerProgressBar({
  length,
  index,
}: PagerProgressBarPagerProgressBar): JSX.Element {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      {Array.from(Array(length).keys()).map((_, idx) => (
        <View
          key={idx}
          style={{
            borderRadius: 4,
            marginHorizontal: 6,
            width: 20,
            height: 6,
            backgroundColor: idx !== index ? '#cdcfce' : '#47d6a2',
          }}
        />
      ))}
    </View>
  );
}
