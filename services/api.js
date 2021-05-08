import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const api = axios.create({
  baseURL: 'http://192.168.1.99:3333',
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
