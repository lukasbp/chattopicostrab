import { StyleSheet } from 'react-native';
import metrics from 'helpers/metrics';
import theme from 'helpers/theme';

const styles = StyleSheet.create({
  container: {
      flex: 1
  },
  header:{
    justifyContent: 'start',
    flexFlow: 'row',
    marginRight: 'auto',
    alignSelf: 'flex-start'
  },
  body:{
    flex: 1,
    backgroundColor: 'black'
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
  chat: {
    paddingLeft: metrics.basePadding,
    fontFamily: 'Avenir',
    fontSize: 18,
  },
});

export default styles;
