import { metrics, theme } from 'helpers';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.main,
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: theme.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  chatName: {
    paddingLeft: metrics.basePadding,
    fontFamily: 'Avenir',
    fontSize: 18,
  },
  socketText: {
    paddingLeft: metrics.basePadding,
    fontFamily: 'Avenir',
    fontSize: 11,
  },
  bottom: {
    flex: 8,
  },
});

export default styles;
