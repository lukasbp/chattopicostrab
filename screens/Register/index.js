import React from 'react';
import { Button, Text, View } from 'react-native';
import { Container, TextInput } from 'screens/Login/styles';

const Register = () => (
    <Container>
        <View>
            <Text>Usuário</Text>
            <TextInput placeholder="Insira seu Usuário"/>
            <Text>Senha</Text>
            <TextInput placeholder="Insira sua Senha"/>
            <Text>Nome</Text>
            <TextInput placeholder="Insira seu Nome"/>
            <Text>Email</Text>
            <TextInput placeholder="Insira seu Email"/>
            <Button title="Registrar"/>
        </View>
    </Container>
);

export default Register;
