// src/utils/axiosClient.js 或 src/apis/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://wings.tcds.ltd',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // can do something before request is sent，like insert token
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    // can do something after response is received
    const res = response.data;
    if (!res || res.code !== 200) {
      return Promise.reject(res);
    }
    return res.data;
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default apiClient;
