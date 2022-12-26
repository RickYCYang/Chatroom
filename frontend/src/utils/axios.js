import { backendUrl } from 'utils/config';
import axios from 'axios';
import { getLocalStorageWithExpiry } from 'utils/localStorage';
import { USER } from 'utils/consts';

const instance = axios.create({
  baseURL: backendUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  xsrfCookieName: 'XSRF-TOKEN', // default
  xsrfHeaderName: 'X-XSRF-TOKEN', // default
  timeout: 20000,
  //withCredentials: true,
});

const setAuthorization = (jwtToken) => {
  instance.defaults.headers.common['Authorization'] = `bearer ${jwtToken}`;
};

const removeAuthorization = () => {
  delete instance.defaults.headers.common['Authorization'];
};

instance.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status) {
      switch (error.response.status) {
        case 403:
          const originalRequest = config;
          const storedUser = getLocalStorageWithExpiry(USER);
          if (storedUser) {
            setAuthorization(storedUser.token);
            return new Promise((resolve) => {
              resolve(instance(originalRequest));
            });
          }
          break;
        default:
          console.error(error.message);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
export { setAuthorization, removeAuthorization };
