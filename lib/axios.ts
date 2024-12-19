import axios from 'axios';
import { getTokens, setTokens, clearTokens } from './auth';

const baseURL = 'http://127.0.0.1:8080/api/v1';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const tokens = getTokens();
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const tokens = getTokens();
        if (!tokens?.refreshToken) throw new Error('No refresh token');

        const response = await axios.post(`${baseURL}/users/refresh`, {
          refreshToken: tokens.refreshToken
        });

        const newTokens = {
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken
        };

        setTokens(newTokens);
        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
        
        return axios(originalRequest);
      } catch (refreshError) {
        clearTokens();
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance; 