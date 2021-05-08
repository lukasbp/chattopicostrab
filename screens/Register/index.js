import React, { useEffect } from 'react';
import Input from 'components/Input/index';
import { Formik } from 'formik';
import { View, ScrollView } from 'react-native';
import * as yup from 'yup';
import ButtonFill from 'components/Button/index';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as AuthActions } from 'store/ducks/auth';
import styles from './styles';

const Register = ({ navigation }) => {
  const { loading, registerFail } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (payload) => {
    dispatch(AuthActions.register(payload));
  };

  useEffect(() => {
    if (registerFail === false) {
      navigation.goBack();
    }
  }, [registerFail]);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}
        validationSchema={yup.object().shape({
          name: yup.string().required('Campo obrigatório'),
          username: yup.string().required('Campo obrigatório'),
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
                label="Usuário"
                returnKeyType="next"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={() => setFieldTouched('username')}
                msg={errors.username}
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
              <ButtonFill
                style={styles.ButtonFill}
                title="Cadastrar"
                onPress={submitForm}
                loading={loading}
              />
            </View>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
};

export default Register;
