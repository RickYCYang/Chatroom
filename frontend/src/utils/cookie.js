import Cookies from 'js-cookie';

export const getCookie = (key) => Cookies.get(key);

export const setCookie = (key, value) =>
  Cookies.set(key, value /*, { expires: 7 }*/);

export const delCookie = (key) => Cookies.remove(key);
