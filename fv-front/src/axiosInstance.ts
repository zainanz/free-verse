import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    }
  });

axiosInstance.interceptors.request.use(
    (config) => {
      console.log(config)
      const token = Cookies.get("token")
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {

      return response
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
