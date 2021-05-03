import Input from 'components/Input/index';
import React from 'react';
import { Formik } from 'formik';
import { View, Text } from 'react-native';
import * as yup from 'yup';
import ButtonFill from 'components/Button/index';
import styles from './styles';

const Login = () => {
  const handleSubmit = () => {};

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>CHAT TOPICOS</Text>
      </View>
      <Formik
        initialValues={{}}
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
              label="Email"
              keyboardType="email-address"
              returnKeyType="next"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              msg={errors.email || ''}
            />
            <Input
              label="Senha"
              returnKeyType="done"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={() => setFieldTouched('password')}
              msg={errors.password || ''}
              secureTextEntry
            />
            <ButtonFill title="Entrar" onPress={submitForm} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Login;
