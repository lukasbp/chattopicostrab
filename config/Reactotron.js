/* eslint-disable import/no-extraneous-dependencies */
import Reactotron, { overlay } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import { getLocalIP } from 'helpers';

const reactotronConfigure = () => {
  if (__DEV__) {
    const tron = Reactotron.configure({ host: getLocalIP() })
      .useReactNative({
        networking: {
          ignoreUrls: /symbolicate|logs|socket.io/,
        },
      })
      .use(overlay())
      .use(reactotronRedux())
      .use(sagaPlugin())
      .connect();

    console.tron = tron;

    tron.clear();
  } else {
    console.tron = class {
      static log(...rest) {
        console.log(...rest);
      }
    };
  }
};

export default reactotronConfigure;
