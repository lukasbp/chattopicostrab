import { AsyncStorage } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { api } from 'services/api';
import { Creators as AuthActions, Types as AuthTypes } from 'store/ducks/auth';

function* login({ payload }) {
  try {
    const { status, data } = yield call(api.post, '/login', payload);
    if (status === 200) {
      yield call(AsyncStorage.multiSet, [
        ['token', data.token],
        ['refresh-token', data.refreshToken],
      ]);
      yield put(AuthActions.loginSuccess(data));
    }
  } catch (e) {
    console.log;
    let msg = '';
    if (e?.response?.data?.[0]?.message || e?.response?.data?.message) {
      msg = e?.response?.data?.[0]?.message || e?.response?.data?.message;
    }
    showMessage({
      message: `Erro ao efetuar login!\n${msg}`,
      type: 'danger',
    });
    yield put(AuthActions.loginFail());
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

function* logoutWatcher() {
  yield takeLatest(AuthTypes.LOGOUT, logout);
}

export default function* rootSaga() {
  yield all([
    fork(loginWatcher),
    fork(registerWatcher),
    fork(refreshLoginWatcher),
    fork(logoutWatcher),
  ]);
}
