import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get('refresh_token');
      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        const response = await axiosInstance.post('/api/users/refresh/', { refresh: refreshToken });
        const { access } = response.data;
        Cookies.set('access_token', access, { path: '/', secure: true, sameSite: 'None' });
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

const axiosMultipartInstance = axios.create({
  baseURL,
});

axiosMultipartInstance.interceptors.request.use((config) => {
  const token = Cookies.get('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['Content-Type'] = 'multipart/form-data';
  return config;
});

axiosMultipartInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get('refresh_token');
      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        const response = await axiosInstance.post('/api/users/refresh/', { refresh: refreshToken });
        const { access } = response.data;
        Cookies.set('access_token', access, { path: '/', secure: true, sameSite: 'None' });
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return axiosMultipartInstance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export { axiosInstance, axiosMultipartInstance };
