import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  EDIT_USER_REQUEST,
  EDIT_USER_FAIL,
  EDIT_USER_SUCCESS,
  CLEAR_EDIT_STATUS,
} from '../actionTypes';
import { USER } from 'utils/consts';
import { getLocalStorageWithExpiry } from 'utils/localStorage';

const storedUser = getLocalStorageWithExpiry(USER) || {};

const initState = {
  message: '',
  loginStatus: '',
  signUpStatus: '',
  editStatus: '',
  nickname: storedUser.nickname || '',
  uid: storedUser.uid || '',
};

const user = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return { ...state, loginStatus: 'loading', message: '' };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginStatus: 'logined',
        message: '',
        nickname: action.payload.nickname,
        uid: action.payload.uid,
      };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        loginStatus: 'error',
        message: action.payload.message,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        loginStatus: 'logout',
        message: '',
        nickname: '',
        uid: '',
      };
    }
    case SIGNUP_REQUEST: {
      return { ...state, signUpStatus: 'processing', message: '' };
    }
    case SIGNUP_SUCCESS: {
      return {
        signUpStatus: 'success',
        message: '',
      };
    }
    case SIGNUP_FAIL: {
      return {
        ...state,
        signUpStatus: 'error',
        message: action.payload.message,
      };
    }
    case EDIT_USER_REQUEST: {
      return {
        ...state,
        message: '',
        editStatus: 'loading',
      };
    }
    case EDIT_USER_FAIL: {
      return {
        ...state,
        editStatus: 'error',
        message: action.payload.message,
      };
    }
    case EDIT_USER_SUCCESS: {
      return {
        ...state,
        editStatus: 'success',
        nickname: action.payload.nickname,
        message: '',
      };
    }
    case CLEAR_EDIT_STATUS: {
      return {
        ...state,
        message: '',
        editStatus: '',
      };
    }
    default:
      return state;
  }
};

export default user;
