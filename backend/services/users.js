class UserService {
  /**
   * users is a map whose key is uid, value is an object,
   * below is an example.
   * {
   *  uid: str,
   *  status: 'online' || 'offline',
   *  nickname: str,
   *  socketId: str
   * }
   */
  #users;

  constructor() {
    this.#users = new Object();
  }

  /** init all users */
  addUsers = (users) => {
    for (const { uid, nickname } of Object.values(users)) {
      this.#users[uid] = {
        uid,
        nickname,
        isOnline: false,
      };
    }
  };

  /** add a new user */
  addUser = (uid, nickname) => {
    this.#users[uid] = {
      uid,
      nickname,
      isOnline: false,
    };
  };

  /** get all users */
  getUsers = () => this.#users;

  /** get user by uid */
  getUserByUid = (uid) => this.#users[uid];

  /** get user by socket id */
  getUserBySocketId = (socketId) => {
    const user = Object.values(this.#users).find(
      (user) => user.socketId === socketId
    );
    return user;
  };

  /** update a user's status */
  updateUserStatus = (uid, socketId, isOnline) => {
    const updatedUser = { ...this.#users[uid], socketId, isOnline };
    if (!isOnline) {
      delete updatedUser.socketId;
    }
    this.#users[uid] = updatedUser;
    return updatedUser;
  };

  /** update a user's nickname */
  updateUserNickname = (uid, nickname) => {
    const updatedUser = { ...this.#users[uid], nickname };
    this.#users[uid] = updatedUser;
    return updatedUser;
  };
}

const userService = new UserService();

module.exports = userService;
