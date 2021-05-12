export const Types = {
  CHATS_REQUEST: 'CHATS_REQUEST',
  CHATS_REQUEST_SUCCESS: 'CHATS_REQUEST_SUCCESS',
  CHATS_REQUEST_FAIL: 'CHATS_REQUEST_FAIL',
  MESSAGES_REQUEST: 'MESSAGES_REQUEST',
  MESSAGES_REQUEST_SUCCESS: 'MESSAGES_REQUEST_SUCCESS',
  MESSAGES_REQUEST_FAIL: 'MESSAGES_REQUEST_FAIL',
  ADD_REQUEST: 'ADD_REQUEST',
  ADD_REQUEST_SUCCESS: 'ADD_REQUEST_SUCCESS',
  ADD_REQUEST_FAIL: 'ADD_REQUEST_FAIL',
};

const INITIAL_STATE = {
  loading: false,
  data: null,
  msgs: [],
};

export default function chat(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CHATS_REQUEST:
      return { ...state, loading: true };
    case Types.CHATS_REQUEST_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case Types.CHATS_REQUEST_FAIL:
      return { ...state, loading: false };
    case Types.MESSAGES_REQUEST:
      return { ...state, loading: true };
    case Types.MESSAGES_REQUEST_SUCCESS:
      return { ...state, loading: false, msgs: action.payload };
    case Types.MESSAGES_REQUEST_FAIL:
      return { ...state, loading: false };
    case Types.ADD_REQUEST:
      return { ...state, loading: true };
    case Types.ADD_REQUEST_SUCCESS:
      return { ...state, loading: false };
    case Types.ADD_REQUEST_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
}

export const Creators = {
  chats: () => ({
    type: Types.CHATS_REQUEST,
  }),
  chatsSuccess: (payload) => ({
    type: Types.CHATS_REQUEST_SUCCESS,
    payload,
  }),
  chatsFail: () => ({
    type: Types.CHATS_REQUEST_FAIL,
  }),
  messages: (payload) => ({
    type: Types.MESSAGES_REQUEST,
    payload,
  }),
  messagesSuccess: (payload) => ({
    type: Types.MESSAGES_REQUEST_SUCCESS,
    payload,
  }),
  messagesFail: () => ({
    type: Types.MESSAGES_REQUEST_FAIL,
  }),
  add: (payload) => ({
    type: Types.ADD_REQUEST,
    payload,
  }),
  addSuccess: () => ({
    type: Types.ADD_REQUEST_SUCCESS,
  }),
  addFail: () => ({
    type: Types.ADD_REQUEST_FAIL,
  }),
};
