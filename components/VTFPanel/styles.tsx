import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  vtfPanelWrapper: {
    paddingRight: 20,
    paddingLeft: 20,
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  redistributionWrapper: {
    height: 130,
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#2C2D2F',
    fontSize: 36,
    lineHeight: 60,
    backgroundColor: 'transparent',
  },
  redistribution: {
    color: '#2C2D2F',
    fontSize: 36,
    lineHeight: 60,
  },
  lpWrapper: {
    height: 130,
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#2C2D2F',
    fontSize: 36,
    lineHeight: 60,
    backgroundColor: 'transparent',
  },
  lp: {
    color: '#2C2D2F',
    fontSize: 36,
    lineHeight: 60,
  },
  vtfWrapper: {
    alignItems: 'center',
    marginVertical: -20,
  },
  vtf: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  labelsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingBottom: 30,
  },
  redistributionLabel: {
    alignItems: 'center',
    flex: 0.3,
  },
  vtfLabel: {
    alignItems: 'center',
    flex: 0.4,
  },
  lpLabel: {
    alignItems: 'center',
    flex: 0.3,
  },
  labelText: {
    color: '#CDCECE',
    fontSize: 12,
    lineHeight: 18,
  },
  points: {
    color: '#2C2D2F',
    fontSize: 50,
    lineHeight: 70,
  },
  subPoint: {
    color: '#2C2D2F',
    fontSize: 20,
    lineHeight: 30,
  },
});

export default styles;
