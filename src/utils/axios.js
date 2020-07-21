import axios from 'axios';
import { getCookie } from './cookie';

const AxiosInstance = axios.create(
  {
    baseURL: `${process.env.VUE_APP_SERVER_HOST}/api/`,
    headers: {
      common: {},
    },
    withCredentials: true,
  },
);

AxiosInstance.interceptors.request.use((config) => {
  const token = getCookie('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

AxiosInstance.interceptors.response.use(null, async error => {
  return Promise.reject(error);
});

export default AxiosInstance;
