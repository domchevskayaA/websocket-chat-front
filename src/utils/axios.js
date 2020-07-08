import axios from 'axios';

const AxiosInstance = axios.create(
  {
    baseURL: `${process.env.VUE_APP_SERVER_HOST}/api/`,
    headers: {
      common: {
          // 'Accept': '*/*',
          // 'Access-Control-Request-Headers': 'content-type, origin',
      },
    },
    withCredentials: true,
  },
);

AxiosInstance.interceptors.response.use(null, async error => {
  return Promise.reject(error);
});

export default AxiosInstance;
