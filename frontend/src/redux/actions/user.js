import {
  LOGIN_REQUEST,
  LOGOUT,
  SIGNUP_REQUEST,
  EDIT_USER_REQUEST,
  CLEAR_EDIT_STATUS,
} from '../actionTypes';

export const login = (email, password) => {
  return {
    type: LOGIN_REQUEST,
    payload: {
      email,
      password,
    },
  };
};

export const logout = (webSocket) => {
  return {
    type: LOGOUT,
    payload: webSocket,
  };
};

export const signup = (email, password, nickname) => {
  return {
    type: SIGNUP_REQUEST,
    payload: {
      email,
      password,
      nickname,
    },
  };
};

export const updateUser = (nickname) => {
  return {
    type: EDIT_USER_REQUEST,
    payload: {
      nickname,
    },
  };
};

export const clearEditStatus = () => {
  return {
    type: CLEAR_EDIT_STATUS,
  };
};
