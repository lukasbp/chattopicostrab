import metrics from 'helpers/metrics';
import theme from 'helpers/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    borderBottomWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    paddingVertical: 5,
  },
  input: {
    color: theme.text,
    flex: 1,
  },
  label: {
    textTransform: 'uppercase',
    color: theme.textSecondary,
    marginBottom: metrics.basePadding / 4,
    fontSize: 11,
  },
  text: {
    fontSize: 11,
    color: theme.tomato,
    fontWeight: 'bold',
  },
});

export default styles;
