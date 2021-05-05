import React from 'react';
import Input from 'components/Input/index';
import { Formik } from 'formik';
import { View, Text, TouchableOpacity } from 'react-native';
import * as yup from 'yup';
import ButtonFill from 'components/Button/index';
import styles from './styles';

const Login = ({ navigation }) => {
  const handleSubmit = () => {
    navigation.navigate('Chats');
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>CHAT TOPICOS</Text>
      </View>
      <Formik
        initialValues={{
          email: 'luiisflorido@gmail.com',
          password: '12345678',
        }}
        onSubmit={handleSubmit}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email('Email inválido')
            .required('Campo obrigatório'),
          password: yup
            .string()
            .min(6, 'Digite ao menos 6 caracteres')
            .required('Campo obrigatório'),
        })}
      >
        {({ values, errors, setFieldTouched, handleChange, submitForm }) => (
          <View style={{ flex: 3 }}>
            <Input
              styles={styles.Input}
              label="Email"
              keyboardType="email-address"
              returnKeyType="next"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              msg={errors.email}
            />
            <Input
              styles={styles.Input}
              label="Senha"
              returnKeyType="done"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={() => setFieldTouched('password')}
              msg={errors.password}
              secureTextEntry
            />
            <ButtonFill
              style={styles.buttonFill}
              title="Entrar"
              onPress={submitForm}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>
                  Não tem conta?{' '}
                  <Text style={styles.registerTextBold}>Cadastre-se</Text>
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Login;
