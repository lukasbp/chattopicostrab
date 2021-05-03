import metrics from 'helpers/metrics';
import theme from 'helpers/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: theme.orange,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.orange,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: metrics.basePadding,
  },
  buttonText: {
    color: theme.white,
    fontWeight: 'bold',
    fontSize: 13,
    textTransform: 'uppercase',
  },
});

export default styles;
