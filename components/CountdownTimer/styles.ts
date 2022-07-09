import { StyleSheet } from 'react-native';

export const CountdownTimeStyles = StyleSheet.create({
  countdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 18,
  },
  countdownMainText: {
    fontSize: 36,
    textAlign: 'center',
    lineHeight: 48,
  },
  countdownSecondaryText: {
    textAlign: 'center',
    fontSize: 12,
  },
  numberCardWrapper: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  numberCard: {
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 60,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
