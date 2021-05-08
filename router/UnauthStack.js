import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from 'screens/Login/index';
import Register from 'screens/Register/index';

const Stack = createStackNavigator();

const UnauthStack = () => (
  <Stack.Navigator>
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
  </Stack.Navigator>
);

export default UnauthStack;
