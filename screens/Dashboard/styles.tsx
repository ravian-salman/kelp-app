import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  balanceWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#46D6A2',
    width: '100%',
  },
  marketValueWrapper: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#46D6A2',
    width: '100%',
  },
  chartWrapper: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#46D6A2',
    width: '100%',
  },
  scaleWrapper: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#46D6A2',
    width: '100%',
  },
  marketValue: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  buttonLabel: {
    color: '#fff',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 24,
  },
  scaleButton: {
    color: '#fff',
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 20,
    backgroundColor: '#46D6A2',
  },
  scaleButtonScaled: {
    color: '#fff',
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export default styles;
