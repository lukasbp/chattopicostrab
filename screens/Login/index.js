import Button from 'components/Button/index';
import React from 'react';
import { TextInput } from 'react-native';
import { Container, Text } from './styles';

const Login = () => (
  <div style={{display:"flex", justifyContent:"center"}}>
      <label>Usuário</label>
      <input></input>
      <label>Senha</label>
      <input></input>
      <button>Logar</button>
  </div>
);

export default Login;
