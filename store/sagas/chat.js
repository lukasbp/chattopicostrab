import { showMessage } from 'react-native-flash-message';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { api } from 'services/api';
import { Creators as ChatActions, Types as ChatTypes } from 'store/ducks/chat';

function* chats() {
  try {
    const { status, data } = yield call(api.get, '/chats');
    if (status === 200) {
      yield put(ChatActions.chatsSuccess(data.data));
    }
  } catch (e) {
    showMessage({
      message: 'Erro ao carregar chats!',
      type: 'danger',
    });
    yield put(ChatActions.chatsFail());
  }
}

function* messages({ payload }) {
  try {
    const { status, data } = yield call(api.get, `/chats/${payload}`);
    if (status === 200) {
      yield put(ChatActions.messagesSuccess(data.data));
    }
  } catch (e) {
    showMessage({
      message: 'Erro ao carregar mensagens!',
      type: 'danger',
    });
    yield put(ChatActions.messagesFail());
  }
}

function* chatsWatcher() {
  yield takeLatest(ChatTypes.CHATS_REQUEST, chats);
}

function* messagesWatcher() {
  yield takeLatest(ChatTypes.MESSAGES_REQUEST, messages);
}

export default function* rootSaga() {
  yield all([fork(chatsWatcher), fork(messagesWatcher)]);
}
