export function clipDecimal(value: number): [string, string] {
  const integer = Math.floor(value);
  let decimal = (value - integer).toString();

  if (decimal === '0') {
    decimal = '0.00';
  } else if (decimal.length < 2) {
    decimal += '0';
  }

  return [
    integer?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    '.' + decimal?.split('.')[1]?.substring(0, 2),
  ];
}
