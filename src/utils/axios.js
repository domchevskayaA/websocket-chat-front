import axios from 'axios';

const AxiosInstance = axios.create(
  {
    baseURL: `${process.env.VUE_APP_SERVER_HOST}:${process.env.VUE_APP_SERVER_PORT}/api/`,
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
