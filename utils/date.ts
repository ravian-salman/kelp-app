export function dateParser(milliSeconds: number): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const days = Math.floor(milliSeconds / (24 * 60 * 60 * 1000));
  const daysms = milliSeconds % (24 * 60 * 60 * 1000);
  const hours = Math.floor(daysms / (60 * 60 * 1000));
  const hoursms = milliSeconds % (60 * 60 * 1000);
  const minutes = Math.floor(hoursms / (60 * 1000));
  const minutesms = milliSeconds % (60 * 1000);
  const seconds = Math.floor(minutesms / 1000);

  return { days, hours, minutes, seconds };
}

export function numberSplitter(value: number, minDigits?: number): string[] {
  const numString = `${value}`;
  const filler: string[] = [];

  if (minDigits && numString.length < minDigits) {
    for (let i = 0; i < minDigits - numString.length; i++) {
      filler.push('0');
    }
  }

  return [...filler, ...numString.split('')];
}
