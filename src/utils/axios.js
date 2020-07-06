import axios from 'axios';

console.log(process.env.VUE_APP_SERVER_URL);

const AxiosInstance = axios.create(
  {
    baseURL: `${process.env.VUE_APP_SERVER_URL}/api/`,
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
