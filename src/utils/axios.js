import axios from 'axios';
import { getCookie, setCookie } from './cookie';

const AxiosInstance = axios.create(
  {
    baseURL: `${process.env.VUE_APP_SERVER_HOST}/api/`,
    headers: {
      common: {},
    },
    withCredentials: true,
  },
);

AxiosInstance.interceptors.request.use(req => {
  const token = getCookie('token');

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
}, error => {
  return Promise.reject(error);
});

AxiosInstance.interceptors.response.use(resp => {
  const { token } = resp.data;
  console.log(token);
  if (token) {
    setCookie('token', token, 14);
  }
  return resp;
}, error => {
  return Promise.reject(error);
});

export default AxiosInstance;
