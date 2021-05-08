import { all } from 'redux-saga/effects';
import authSagas from './auth';
import chatSagas from './chat';

export default function* rootSagas() {
  yield all([authSagas(), chatSagas()]);
}
