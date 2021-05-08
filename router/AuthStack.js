import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Chats from 'screens/Chats/index';
import Messages from 'screens/Messages/index';

const Stack = createStackNavigator();

const AuthStack = () => (
  <>
    <Stack.Screen
      name="Chats"
      component={Chats}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Messages"
      component={Messages}
      options={{ headerShown: false }}
    />
  </>
);

export default AuthStack;
