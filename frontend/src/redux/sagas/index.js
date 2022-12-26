/* eslint-disable-next-line */
import { takeEvery } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  SIGNUP_REQUEST,
  LOGOUT,
  EDIT_USER_REQUEST,
} from '../actionTypes';
import { loginRequest, logout, signupRequest, editUserRequest } from './user';

//import { getUserInfoRequest, editUserRequest } from "./editSaga";

export default function* rootSaga() {
  yield takeEvery(LOGIN_REQUEST, loginRequest);
  yield takeEvery(LOGOUT, logout);
  yield takeEvery(SIGNUP_REQUEST, signupRequest);
  yield takeEvery(EDIT_USER_REQUEST, editUserRequest);

  //yield takeEvery(GET_USER_ACCOUNT_REQUEST, getUserInfoRequest);
}
