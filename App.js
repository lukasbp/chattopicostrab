import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import { ThemeProvider } from 'styled-components';
import Router from 'router/index';
import XProvider from 'components/Provider/index';
import { theme } from 'helpers/index';
import store from 'store';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  const navigationRef = React.useRef();
  const [loaded] = useFonts({
    Avenir: require('./assets/fonts/Avenir.ttf'),
    AvenirBold: require('./assets/fonts/Avenir-Bold.ttf'),
    AvenirMedium: require('./assets/fonts/Avenir-Medium.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <XProvider>
        <NavigationContainer ref={navigationRef}>
          <ThemeProvider theme={theme}>
            <StatusBar backgroundColor={theme.main} barStyle="dark-content" />
            <View
              style={{
                flex: 1,
                paddingTop: Constants.statusBarHeight,
                backgroundColor: theme.primary,
              }}
            >
              <Router />
            </View>
          </ThemeProvider>
        </NavigationContainer>
      </XProvider>
      <FlashMessage position="bottom" />
    </Provider>
  );
}
