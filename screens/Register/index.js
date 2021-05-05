import React from 'react';
import Input from 'components/Input/index';
import { Formik } from 'formik';
import { View, ScrollView } from 'react-native';
import * as yup from 'yup';
import ButtonFill from 'components/Button/index';
import styles from './styles';

const Register = ({ navigation }) => {
  const handleSubmit = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}
        validationSchema={yup.object().shape({
          name: yup.string().required('Campo obrigatório'),
          email: yup
            .string()
            .email('Email inválido')
            .required('Campo obrigatório'),
          password: yup
            .string()
            .min(6, 'Digite ao menos 6 caracteres')
            .required('Campo obrigatório'),
          confirm_password: yup
            .string()
            .min(6, 'Digite ao menos 6 caracteres')
            .required('Campo obrigatório')
            .oneOf([yup.ref('password')], 'As senhas devem ser iguais.'),
        })}
      >
        {({ values, errors, setFieldTouched, handleChange, submitForm }) => (
          <ScrollView>
            <View style={styles.form}>
              <Input
                label="Nome"
                returnKeyType="next"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={() => setFieldTouched('name')}
                msg={errors.name}
              />
              <Input
                label="Email"
                keyboardType="email-address"
                returnKeyType="next"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                msg={errors.email}
              />
              <Input
                label="Senha"
                returnKeyType="next"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                msg={errors.password}
                secureTextEntry
              />
              <Input
                label="Confirmar Senha"
                returnKeyType="done"
                value={values.confirm_password}
                onChangeText={handleChange('confirm_password')}
                onBlur={() => setFieldTouched('confirm_password')}
                msg={errors.confirm_password}
                secureTextEntry
              />
              <ButtonFill style={styles.ButtonFill} title="Cadastrar" onPress={submitForm} />
            </View>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
};

export default Register;
