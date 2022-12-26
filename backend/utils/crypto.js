const CryptoJS = require('crypto-js');
const { SECRET_KEY } = require('./config');

const encrypt = (plainText) => {
  return CryptoJS.AES.encrypt(plainText, SECRET_KEY).toString();
};

const decrypt = (ciphertext) => {
  return CryptoJS.AES.decrypt(ciphertext, SECRET_KEY).toString(
    CryptoJS.enc.Utf8
  );
};

module.exports = { encrypt, decrypt };
