import { put } from 'redux-saga/effects';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAIL,
} from '../actionTypes';
import { USER } from 'utils/consts';

/** utils */
import axios, { setAuthorization, removeAuthorization } from 'utils/axios';

/** utils */
import {
  setLocalStorageWithExpiry,
  removeLocalStorage,
  getLocalStorageWithExpiry,
} from '../../utils/localStorage';

export function* loginRequest(action) {
  const { email, password } = action.payload;
  try {
    const {
      data: { token, nickname, uid },
    } = yield axios.post('login', {
      email,
      password,
    });
    const user = {
      uid,
      nickname,
      token,
    };
    yield setLocalStorageWithExpiry(USER, user);
    setAuthorization(token);
    yield put({ type: LOGIN_SUCCESS, payload: { uid, nickname } });
  } catch (error) {
    console.error('error', error);
    const {
      response: { data },
    } = error;
    console.log('data', data.message);
    yield put({
      type: LOGIN_FAIL,
      payload: {
        message: data.message,
      },
    });
  }
}

export function* logout(_action) {
  yield removeLocalStorage(USER);
  removeAuthorization();
}

export function* signupRequest(action) {
  const { email, password, nickname } = action.payload;
  try {
    const {
      data: { uid },
    } = yield axios.post('signup', {
      email,
      password,
      nickname,
    });

    yield put({
      type: SIGNUP_SUCCESS,
      uid,
    });
  } catch (error) {
    console.error('error', error);
    const {
      response: { data },
    } = error;
    console.log('data', data.message);
    yield put({
      type: SIGNUP_FAIL,
      payload: {
        message: data.message,
      },
    });
  }
}

export function* editUserRequest(action) {
  const { nickname } = action.payload;
  try {
    yield axios.patch('edit', {
      nickname,
    });
    yield put({
      type: EDIT_USER_SUCCESS,
      payload: {
        nickname,
      },
    });
    const user = getLocalStorageWithExpiry(USER);
    user.nickname = nickname;
    yield setLocalStorageWithExpiry(USER, user);
  } catch (error) {
    const {
      response: { data },
    } = error;
    yield put({
      type: EDIT_USER_FAIL,
      payload: {
        message: data.error,
      },
    });
  }
}
