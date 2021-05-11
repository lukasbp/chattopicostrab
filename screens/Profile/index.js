import React from 'react';
import Input from 'components/Input/index';
import { Formik } from 'formik';
import { View, ScrollView } from 'react-native';
import * as yup from 'yup';
import ButtonFill from 'components/Button/index';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as AuthActions } from 'store/ducks/auth';
import styles from './styles';

const Profile = () => {
  const { loading, data } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (payload) => {
    const newValues = { ...payload };
    Object.keys(newValues).map(
      (e) =>
        (!newValues[e] || e === 'confirm_password' || e === 'username') &&
        delete newValues[e]
    );
    dispatch(AuthActions.updateUser(newValues));
  };

  return (
    <View style={styles.container}>
      <Formik
        enableReinitialize
        initialValues={{
          name: data?.user?.name,
          username: data?.user?.username,
          password: '',
          confirm_password: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={yup.object().shape({
          name: yup.string().required('Campo obrigatório'),
          password: yup.string().min(6, 'Digite ao menos 6 caracteres'),
          confirm_password: yup.string().when('password', {
            is: (passwd) => !!passwd,
            then: yup
              .string()
              .required('Campo obrigatório')
              .oneOf(
                [yup.ref('password'), null],
                'As senhas devem ser iguais.'
              ),
            otherwise: yup.string().nullable(),
          }),
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
                disabled
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
                title="Atualizar"
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

export default Profile;
