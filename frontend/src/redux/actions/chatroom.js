import {
  SET_USERS,
  TOGGLE_USER_BAR,
  SET_RECEIVER,
  SET_MESSAGE,
  SET_NEW_MESSAGE_COUNT,
  TOGGLE_IMAGE_MODAL,
  CLEAR_MESSAGES,
} from '../actionTypes';

export const setUsers = (users) => {
  return {
    type: SET_USERS,
    payload: users,
  };
};

export const toggleUserbar = (open) => {
  return {
    type: TOGGLE_USER_BAR,
    payload: open,
  };
};

export const setReceiver = (uid) => {
  return {
    type: SET_RECEIVER,
    payload: uid,
  };
};

export const setMessage = (
  chatToUid,
  senderUid,
  receiverUid,
  message,
  timestamp,
  type
) => {
  return {
    type: SET_MESSAGE,
    payload: {
      chatToUid,
      senderUid,
      receiverUid,
      message,
      timestamp,
      type,
    },
  };
};

export const setNewMessageCount = (uid, type) => {
  return {
    type: SET_NEW_MESSAGE_COUNT,
    payload: {
      uid,
      type,
    },
  };
};

export const toggleImageModal = (open, imgUrl) => {
  return {
    type: TOGGLE_IMAGE_MODAL,
    payload: {
      open,
      imgUrl,
    },
  };
};

export const clearMessages = () => {
  return {
    type: CLEAR_MESSAGES,
  };
};
