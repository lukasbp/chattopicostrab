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
    flex: 8,
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contatoContainer: {
    height: 70,
    borderBottomColor: theme.text,
    borderBottomWidth: 0.5,
  },
  contato: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contatoText: {
    color: theme.text,
    paddingLeft: metrics.basePadding,
    fontFamily: 'AvenirBold',
    fontSize: 17,
  },
  chat: {
    paddingLeft: metrics.basePadding,
    fontFamily: 'Avenir',
    fontSize: 18,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.darker,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: theme.darker,
  },
  touchableContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  lastContainer: {
    paddingLeft: metrics.basePadding * 2,
  },
  lastText: {
    fontSize: 11,
    color: theme.text,
    paddingBottom: metrics.basePadding,
  },
});

export default styles;
