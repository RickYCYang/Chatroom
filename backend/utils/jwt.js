const jwt = require('jsonwebtoken');
const { SECRET } = require('./config.js');

const signJwt = (payload, expire) => {
  return jwt.sign(payload, SECRET, {
    expiresIn: expire,
  });
};

const decodeJwt = (token) => jwt.verify(token, SECRET);

module.exports = {
  signJwt,
  decodeJwt,
};
