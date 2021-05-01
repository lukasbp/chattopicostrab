import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from 'screens/Login/index';
import Register from 'screens/Register/index';
import Chats from 'screens/Chats/index';
import Messages from 'screens/Messages/index';

const Stack = createStackNavigator();

const Router = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Chats" component={Chats} />
    <Stack.Screen name="Messages" component={Messages} />
  </Stack.Navigator>
);

export default Router;