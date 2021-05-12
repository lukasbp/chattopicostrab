import { AsyncStorage } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { api } from 'services/api';
import { Creators as AuthActions, Types as AuthTypes } from 'store/ducks/auth';

function* login({ payload, isRefresh = false }) {
  console.tron.log('AAAA', payload, isRefresh);
  try {
    const { status, data } = yield call(api.post, '/login', payload);
    if (status === 200) {
      yield call(AsyncStorage.multiSet, [
        ['token', data.token],
        ['refresh-token', data.refreshToken],
      ]);
      yield put(
        isRefresh
          ? AuthActions.refreshSuccess(data)
          : AuthActions.loginSuccess(data)
      );
    }
  } catch (e) {
    showMessage({
      message: `Erro ao efetuar login! Confira seu usuário e senha e tente novamente`,
      type: 'danger',
    });
    yield put(isRefresh ? AuthActions.refreshFail() : AuthActions.loginFail());
  }
}

function* register({ payload }) {
  try {
    const { status, data } = yield call(api.post, '/register', payload);
    if (status === 200) {
      showMessage({
        message: `Registro efetuado com sucesso!`,
        type: 'success',
      });
      yield put(AuthActions.registerSuccess(data));
    }
  } catch (e) {
    let msg = '';
    if (e?.response?.data?.[0]?.message || e?.response?.data?.message) {
      msg = e?.response?.data?.[0]?.message || e?.response?.data?.message;
    }
    showMessage({
      message: `Erro ao efetuar registro!\n${msg}`,
      type: 'danger',
    });
    yield put(AuthActions.registerFail());
  }
}

function* updateUser({ payload }) {
  try {
    const { status, data } = yield call(api.put, '/user', payload);
    if (status === 200) {
      showMessage({
        message: `Perfil atualizado com sucesso!`,
        type: 'success',
      });
      yield put(AuthActions.updateUserSuccess(data));
    }
  } catch (e) {
    let msg = '';
    if (e?.response?.data?.[0]?.message || e?.response?.data?.message) {
      msg = e?.response?.data?.[0]?.message || e?.response?.data?.message;
    }
    showMessage({
      message: `Erro ao atualizar perfil!\n${msg}`,
      type: 'danger',
    });
    yield put(AuthActions.updateUserFail());
  }
}

function* logout() {
  yield call(AsyncStorage.multiRemove, ['token', 'refresh-token']);
}

function* loginWatcher() {
  yield takeLatest(AuthTypes.LOGIN_REQUEST, login);
}

function* registerWatcher() {
  yield takeLatest(AuthTypes.REGISTER_REQUEST, register);
}

function* refreshLoginWatcher() {
  yield takeLatest(AuthTypes.REFRESH_LOGIN_REQUEST, login);
}

function* updateUserWatcher() {
  yield takeLatest(AuthTypes.UPDATE_USER_REQUEST, updateUser);
}

function* logoutWatcher() {
  yield takeLatest(AuthTypes.LOGOUT, logout);
}

export default function* rootSaga() {
  yield all([
    fork(loginWatcher),
    fork(registerWatcher),
    fork(refreshLoginWatcher),
    fork(updateUserWatcher),
    fork(logoutWatcher),
  ]);
}
