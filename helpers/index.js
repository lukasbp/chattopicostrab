import Constants from 'expo-constants';
import theme from './theme';
import metrics from './metrics';

const { manifest } = Constants;

const getLocalIP = () => manifest.debuggerHost.split(':')[0];

export { theme, metrics, getLocalIP };
