/** services */
const userService = require('./users');

/** utils */
const { decrypt } = require('../utils/crypto');
const {
  CONNECTION,
  DISCONNECT,
  JOIN,
  LEAVE,
  CHAT,
  ALL,
} = require('../utils/const');

const socketEvents = (io) => {
  // new connection
  io.on(CONNECTION, (socket) => {
    /** new user join the room */
    socket.on(JOIN, (uid) => joinHandler(io, socket, uid));

    /** send message */
    socket.on(CHAT, (encryptedMsg) => chatHandler(io, encryptedMsg));

    /** disconnect */
    socket.on(DISCONNECT, () => disconnectHandler(io, socket));
  });
};

/** update user's status who joins the chatroom */
const joinHandler = (io, socket, uid) => {
  const newUser = userService.updateUserStatus(uid, socket.id, true);
  const users = userService.getUsers();
  io.emit(JOIN, {
    newUser,
    users,
  });
};

/** send the encrypted message to the sender and receivers */
const chatHandler = (io, encryptedMsg) => {
  const { senderUid, receiverUid } = JSON.parse(decrypt(encryptedMsg));
  /** brocast the encrypted message */
  if (receiverUid === ALL) {
    io.emit(CHAT, encryptedMsg);
    return;
  }
  /** send the encrypted message to both sender and receiver */
  const { socketId: sender } = userService.getUserByUid(senderUid);
  const { socketId: receiver } = userService.getUserByUid(receiverUid);
  io.to(sender).emit(CHAT, encryptedMsg);
  io.to(receiver).emit(CHAT, encryptedMsg);
};

/** update user's status who leaves the chatroom */
const disconnectHandler = (io, socket) => {
  const leavedUser = userService.getUserBySocketId(socket.id);
  if (leavedUser) {
    userService.updateUserStatus(leavedUser.uid, socket.id, false);
    const users = userService.getUsers();
    io.emit(LEAVE, {
      leavedUser,
      users,
    });
  }
};

module.exports = socketEvents;
