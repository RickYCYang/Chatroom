import {
  SET_USERS,
  TOGGLE_USER_BAR,
  SET_RECEIVER,
  SET_MESSAGE,
  SET_NEW_MESSAGE_COUNT,
  TOGGLE_IMAGE_MODAL,
  CLEAR_MESSAGES,
} from '../actionTypes';
import { MESSAGES, USERS, NEW_MESSAGE_COUNT, NEW, CLEAR } from 'utils/consts';

import {
  setLocalStorageWithExpiry,
  getLocalStorageWithExpiry,
} from 'utils/localStorage';

const initState = {
  users: getLocalStorageWithExpiry(USERS) || [],
  openUserbar: true,
  receiver: '',
  imageModal: {
    open: false,
    imageUrl: '',
  },
  /**
   * messages is an object whose keys are uid that represent
   * to the chat user. example of messages is as below
   * {
   *    uid1:[
   *        {senderUid, receiverUid, message, timestamp},
   *        {senderUid, receiverUid, message, timestamp},
   *    ],
   *    ...
   * }
   */
  messages: getLocalStorageWithExpiry(MESSAGES) || {},
  /**
   * newMessageCount is an object whose keys are uid that represent
   * to the new message count from all users. example of newMessageCount is as below
   * {
   *    uid1: 0,
   *    uid2: 2,
   *    ...
   * }
   */
  newMessageCount: getLocalStorageWithExpiry(NEW_MESSAGE_COUNT) || {},
};

const chatroom = (state = initState, action) => {
  switch (action.type) {
    case SET_USERS: {
      const users = action.payload;
      /** update localStorage */
      setLocalStorageWithExpiry(USERS, users);
      return {
        ...state,
        users: users,
      };
    }
    case TOGGLE_USER_BAR: {
      return {
        ...state,
        openUserbar: action.payload,
      };
    }
    case SET_RECEIVER: {
      return {
        ...state,
        receiver: action.payload,
      };
    }
    case SET_MESSAGE: {
      const { chatToUid, senderUid, receiverUid, message, timestamp, type } =
        action.payload;

      /** init messages and new message count */
      let messages = [];
      if (state.messages[chatToUid]) {
        messages = [...state.messages[chatToUid]];
      }

      /** append new message */
      messages.push({
        chatToUid,
        senderUid,
        receiverUid,
        message,
        timestamp,
        type,
      });

      /** prepare the new state for replacing the old */
      const allMessages = {
        ...state.messages,
        [chatToUid]: messages,
      };

      /** update localStorage */
      setLocalStorageWithExpiry(MESSAGES, allMessages);

      return {
        ...state,
        messages: allMessages,
      };
    }
    case SET_NEW_MESSAGE_COUNT: {
      const { uid, type } = action.payload;
      let newMessageCount = state.newMessageCount[uid] || 0;
      switch (type) {
        case CLEAR: {
          newMessageCount = 0;
          break;
        }
        case NEW: {
          if (uid !== state.receiver) {
            newMessageCount += 1;
          }
          break;
        }
        default:
          newMessageCount = 0;
      }

      const allNewMessageCount = {
        ...state.newMessageCount,
        [uid]: newMessageCount,
      };
      /** update localStorage */
      setLocalStorageWithExpiry(NEW_MESSAGE_COUNT, allNewMessageCount);
      return {
        ...state,
        newMessageCount: allNewMessageCount,
      };
    }
    case CLEAR_MESSAGES: {
      /** prepare the new state for replacing the old */
      const allMessages = {
        ...state.messages,
        [state.receiver]: [],
      };
      const allNewMessageCount = {
        ...state.newMessageCount,
        [state.receiver]: 0,
      };
      /** update localStorage */
      setLocalStorageWithExpiry(MESSAGES, allMessages);
      setLocalStorageWithExpiry(NEW_MESSAGE_COUNT, allNewMessageCount);
      return {
        ...state,
        messages: allMessages,
        newMessageCount: allNewMessageCount,
      };
    }
    case TOGGLE_IMAGE_MODAL: {
      return {
        ...state,
        imageModal: {
          open: action.payload.open,
          imageUrl: action.payload.imgUrl,
        },
      };
    }
    default:
      return state;
  }
};

export default chatroom;
