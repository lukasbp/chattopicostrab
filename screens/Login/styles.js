import { StyleSheet } from 'react-native';
import metrics from 'helpers/metrics';
import theme from 'helpers/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    paddingHorizontal: metrics.baseMargin,
    flex: 1,
    alignContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: "white",
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: metrics.basePadding * 2,
    fontSize: 18,
  },
  inputContainer: {
    marginTop: metrics.baseMargin,
    flexDirection: 'row',
    alignSelf: 'stretch',
    borderBottomWidth: 2,
    alignItems: 'center',
    paddingVertical: 5,
  },
  buttonFill:{
    backgroundColor: "crimson",
    border: "crimson"
  },
  Input: {
    marginLeft: metrics.baseMargin / 2,
    color: "white",
    flex: 1,
    fontFamily: 'avenir',
  },
  registerContainer: { marginTop: metrics.basePadding },
  registerText: {
    color: "white",
    textAlign: 'center',
  },
  registerTextBold: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default styles;
