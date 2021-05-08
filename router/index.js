import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { Creators as AuthActions } from 'store/ducks/auth';
import AuthStack from './AuthStack';
import UnauthStack from './UnauthStack';

const Stack = createStackNavigator();

const Router = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { data, loading: refreshLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!refreshLoading) {
      setLoading(false);
    }
  }, [refreshLoading]);

  useEffect(() => {
    const refresh = async () => {
      const refreshToken = await AsyncStorage.getItem('refresh-token');
      if (refreshToken) {
        dispatch(AuthActions.refresh({ refresh_token: refreshToken }));
      }
    };
    refresh();
  }, []);

  if (loading || refreshLoading) {
    return null;
  }

  return (
    <Stack.Navigator headerMode="none">
      {data ? (
        <Stack.Screen name="Auth" component={AuthStack} />
      ) : (
        <Stack.Screen name="Unauth" component={UnauthStack} />
      )}
    </Stack.Navigator>
  );
};

export default Router;
