import React from 'react';
import { Container, Text, TextInput, Button } from './styles';

const Login = () => (
  <Container>
      <Text>Usuário</Text>
      <TextInput placeholder="Insira Seu Usuário"></TextInput>
      <Text>Senha</Text>
      <TextInput placeholder="Insira Sua Senha"></TextInput>
      <Button title="Login">Logar</Button>
  </Container>
);

export default Login;
