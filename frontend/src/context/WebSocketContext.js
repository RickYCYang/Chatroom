import { createContext } from 'react';
import socketClient from 'socket.io-client';

/** redux */
import { useDispatch, useSelector } from 'react-redux';
import {
  setUsers,
  setReceiver,
  setMessage,
  setNewMessageCount,
} from 'redux/actions/chatroom';

/** config */
import { backendHost } from 'utils/config';

/** utils */
import { CHAT, JOIN, LEAVE, ALL, NEW } from 'utils/consts';
import { encrypt, decrypt } from 'utils/crypto';

/** hooks */
import useDeviceDetect from '../hooks/useDeviceDetect';

/* third-party lib */
import moment from 'moment';

/** asset */
import chatIcon from 'assets/image/chatNotice.png';

const WebSocketContext = createContext(null);

const WebSocketProvider = ({ children }) => {
  let socket;
  let socketWithExposeFuncs; // the exposed functions and var
  const { isMobile } = useDeviceDetect();

  /** store vars */
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.uid);

  const sendMessage = (nickname, senderUid, receiverUid, message, type) => {
    const payload = {
      senderUid,
      receiverUid,
      message,
      nicknameOfSender: nickname,
      type,
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
    };
    socket.emit(CHAT, encrypt(payload));
  };

  const disconnect = () => {
    socket.disconnect(backendHost);
  };

  const sendJoinMsg = (socket) => socket.emit(JOIN, uid);

  const listenToJoin = (socket) => {
    socket.on(JOIN, (data) => {
      dispatch(setUsers(data.users));
    });
  };

  const listenToLeave = (socket) => {
    socket.on(LEAVE, (data) => {
      dispatch(setUsers(data.users));
    });
  };

  const listenToMessage = (socket) => {
    socket.on(CHAT, (data) => {
      const {
        senderUid,
        receiverUid,
        message,
        timestamp,
        nicknameOfSender,
        type,
      } = decrypt(data);
      /** prepare chat to person */
      let chatToUid;
      if (receiverUid === ALL) chatToUid = ALL;
      else if (senderUid === uid) chatToUid = receiverUid;
      else if (receiverUid === uid) chatToUid = senderUid;

      dispatch(
        setMessage(chatToUid, senderUid, receiverUid, message, timestamp, type)
      );
      dispatch(setNewMessageCount(chatToUid, NEW));

      /** raise a notification */
      if (document.hasFocus() || senderUid === uid || isMobile) return;
      new Notification(nicknameOfSender, {
        body: message,
        icon: chatIcon,
      });
    });
  };

  const listenToConnectError = (socket) => {
    socket.on('connect_error', (err) => {
      console.error(`connect_error due to ${err.message}`);
    });
  };

  if (!socket && uid) {
    socket = socketClient(backendHost, {
      transports: ['websocket'],
      path: '/socket.io',
    });
    dispatch(setReceiver(ALL));
    sendJoinMsg(socket);
    listenToJoin(socket);
    listenToLeave(socket);
    listenToMessage(socket);
    listenToConnectError(socket);

    socketWithExposeFuncs = {
      socket,
      sendMessage,
      disconnect,
    };
  }

  return (
    <WebSocketContext.Provider value={socketWithExposeFuncs}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
export { WebSocketContext };
