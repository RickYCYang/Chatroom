import CryptoJS from 'crypto-js';
import { secretKey } from './config';

export const encrypt = (plainText) => {
  if (typeof plainText === 'object') {
    return CryptoJS.AES.encrypt(
      JSON.stringify(plainText),
      secretKey
    ).toString();
  }
  return CryptoJS.AES.encrypt(plainText, secretKey).toString();
};

export const decrypt = (ciphertext) => {
  return JSON.parse(
    CryptoJS.AES.decrypt(ciphertext, secretKey).toString(CryptoJS.enc.Utf8)
  );
};
