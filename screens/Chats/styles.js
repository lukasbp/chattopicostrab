import { StyleSheet } from 'react-native';
import metrics from 'helpers/metrics';
import theme from 'helpers/theme';
import { color } from 'react-native-reanimated';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 'auto',
    alignSelf: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'black',
    marginLeft: 10,
  },
  body: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderBottomColor: 'crimson',
    borderBottomWidth: 1,
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'crimson',
  },
  contato: {
    borderBottomColor: 'crimson',
    borderBottomWidth: 1,
  },
  chat: {
    paddingLeft: metrics.basePadding,
    fontFamily: 'Avenir',
    fontSize: 18,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
