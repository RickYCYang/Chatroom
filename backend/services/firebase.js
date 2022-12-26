const firebaseAdmin = require('../firebaseConn/firebase_admin_connect.js');
const firebase = require('../firebaseConn/firebase_connect');
const firebaseAuth = firebase.auth();

const getUser = async (uid) => {
  const user = await firebaseAdmin.ref(`/user/${uid}`).once('value');
  return user.val();
};

const updateNickname = async (uid, nickname) => {
  await firebaseAdmin.ref('/user/' + uid + '/nickname').set(nickname);
};

const signIn = async (email, password) => {
  const {
    user: { uid },
  } = await firebaseAuth.signInWithEmailAndPassword(email, password);
  return uid;
};

const signUp = async (email, password) => {
  const {
    user: { uid },
  } = await firebaseAuth.createUserWithEmailAndPassword(email, password);
  return uid;
};

const saveUser = async (email, password, nickname, uid) => {
  await firebaseAdmin.ref('/user/' + uid).set({
    email,
    password,
    nickname,
    uid,
  });
};

const getUsers = async () => {
  const users = await firebaseAdmin.ref('user').once('value');
  return users.val();
};

module.exports = {
  getUser,
  updateNickname,
  signIn,
  signUp,
  saveUser,
  getUsers,
};
