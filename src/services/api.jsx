import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosMultipartInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = Cookies.get('access_token');
  const csrfToken = Cookies.get('csrftoken');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }

  return config;
}, (error) => Promise.reject(error));

axiosMultipartInstance.interceptors.request.use((config) => {
  const accessToken = Cookies.get('access_token');
  const csrfToken = Cookies.get('csrftoken');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }

  return config;
}, (error) => Promise.reject(error));

const handleResponseError = async (error) => {
  const originalRequest = error.config;
  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const response = await axiosInstance.post('/api/v1/refresh/', { refresh: Cookies.get('refresh_token') });
      const { access } = response.data;
      Cookies.set('access_token', access, { path: '/', secure: true, sameSite: 'None' });
      originalRequest.headers.Authorization = `Bearer ${access}`;
      return axios(originalRequest);
    } catch (err) {
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      return Promise.reject(err);
    }
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(response => response, handleResponseError);
axiosMultipartInstance.interceptors.response.use(response => response, handleResponseError);

export { axiosInstance, axiosMultipartInstance };
