import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from 'screens/Login/index';
import Register from 'screens/Register/index';
import Chats from 'screens/Chats/index';
import Messages from 'screens/Messages/index';

const Stack = createStackNavigator();

const Router = () => (
  <Stack.Navigator initialRouteName="Messages">
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Register"
      component={Register}
      options={{
        title: 'Registrar',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />
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
  </Stack.Navigator>
);

export default Router;
