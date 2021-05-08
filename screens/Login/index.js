import React, { useEffect } from 'react';
import Input from 'components/Input/index';
import { Formik } from 'formik';
import { View, Text, TouchableOpacity } from 'react-native';
import * as yup from 'yup';
import ButtonFill from 'components/Button/index';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as AuthActions } from 'store/ducks/auth';
import styles from './styles';

const Login = ({ navigation }) => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (payload) => {
    dispatch(AuthActions.login(payload));
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>CHAT TOPICOS</Text>
      </View>
      <Formik
        initialValues={{
          username: 'louis',
          password: '123456',
        }}
        onSubmit={handleSubmit}
        validationSchema={yup.object().shape({
          username: yup
            .string()
            .min(3, 'Digite ao menos 3 caracteres')
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
              label="Usuário"
              returnKeyType="next"
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={() => setFieldTouched('username')}
              msg={errors.username}
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
              loading={loading}
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
