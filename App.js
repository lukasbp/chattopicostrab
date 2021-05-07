import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import { ThemeProvider } from 'styled-components';
import Router from 'router/index';
import Provider from 'components/Provider/index';
import { theme } from 'helpers/index';

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
    <Provider>
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
    </Provider>
  );
}
