import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Chats from 'screens/Chats/index';
import Messages from 'screens/Messages/index';
import Profile from 'screens/Profile';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Chats"
      component={Chats}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      // options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Messages"
      component={Messages}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AuthStack;
