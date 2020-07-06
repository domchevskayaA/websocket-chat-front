import axios from 'axios';
import { SERVER_URL } from '../config';

const AxiosInstance = axios.create(
  {
    baseURL: `${SERVER_URL}/api/`,
  }
);

AxiosInstance.defaults.withCredentials = true;

// Request interceptor
AxiosInstance.interceptors.request.use(request => {
  request.headers.common["Accept"] = '*/*';
  return request
});

AxiosInstance.interceptors.response.use(null, async error => {
  return Promise.reject(error);
});

export default AxiosInstance;
