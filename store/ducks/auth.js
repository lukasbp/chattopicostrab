export const Types = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_REQUEST_SUCCESS: 'LOGIN_REQUEST_SUCCESS',
  LOGIN_REQUEST_FAIL: 'LOGIN_REQUEST_FAIL',
  REFRESH_LOGIN_REQUEST: 'REFRESH_LOGIN_REQUEST',
  REFRESH_LOGIN_REQUEST_SUCCESS: 'REFRESH_LOGIN_REQUEST_SUCCESS',
  REFRESH_LOGIN_REQUEST_FAIL: 'REFRESH_LOGIN_REQUEST_FAIL',
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_REQUEST_SUCCESS: 'REGISTER_REQUEST_SUCCESS',
  REGISTER_REQUEST_FAIL: 'REGISTER_REQUEST_FAIL',
  UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  UPDATE_USER_FAIL: 'UPDATE_USER_FAIL',
  LOGOUT: 'LOGOUT',
};

const INITIAL_STATE = {
  loading: false,
  data: null,
  updateFail: null,
  registerFail: null,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOGIN_REQUEST:
      return { ...state, loading: true };
    case Types.LOGIN_REQUEST_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case Types.LOGIN_REQUEST_FAIL:
      return { ...state, loading: false };
    case Types.REFRESH_LOGIN_REQUEST:
      return { ...state, loading: true };
    case Types.REFRESH_LOGIN_REQUEST_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case Types.REFRESH_LOGIN_REQUEST_FAIL:
      return { ...state, loading: false };
    case Types.REGISTER_REQUEST:
      return { ...state, loading: true, registerFail: null };
    case Types.REGISTER_REQUEST_SUCCESS:
      return { ...state, loading: false, registerFail: false };
    case Types.REGISTER_REQUEST_FAIL:
      return { ...state, loading: false, registerFail: true };
    case Types.UPDATE_USER_REQUEST:
      return { ...state, loading: true };
    case Types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: { ...state.data, user: action.payload },
      };
    case Types.UPDATE_USER_FAIL:
      return { ...state, loading: false };
    case Types.LOGOUT: {
      return { ...state, loading: false, registerFail: null, data: null };
    }
    default:
      return state;
  }
}

export const Creators = {
  logout: () => ({
    type: Types.LOGOUT,
  }),
  login: (payload) => ({
    type: Types.LOGIN_REQUEST,
    payload,
  }),
  loginSuccess: (payload) => ({
    type: Types.LOGIN_REQUEST_SUCCESS,
    payload,
  }),
  loginFail: () => ({
    type: Types.LOGIN_REQUEST_FAIL,
  }),
  refresh: (payload) => ({
    type: Types.REFRESH_LOGIN_REQUEST,
    payload,
  }),
  refreshSuccess: (payload) => ({
    type: Types.REFRESH_LOGIN_REQUEST_SUCCESS,
    payload,
  }),
  refreshFail: () => ({
    type: Types.REFRESH_LOGIN_REQUEST_FAIL,
  }),
  register: (payload) => ({
    type: Types.REGISTER_REQUEST,
    payload,
  }),
  registerSuccess: (payload) => ({
    type: Types.REGISTER_REQUEST_SUCCESS,
    payload,
  }),
  registerFail: () => ({
    type: Types.REGISTER_REQUEST_FAIL,
  }),
  updateUser: (payload) => ({
    type: Types.UPDATE_USER_REQUEST,
    payload,
  }),
  updateUserSuccess: (payload) => ({
    type: Types.UPDATE_USER_SUCCESS,
    payload,
  }),
  updateUserFail: () => ({
    type: Types.UPDATE_USER_FAIL,
  }),
};
