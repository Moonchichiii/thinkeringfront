import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../services/api';
import Cookies from 'js-cookie';

// Utility function to clear authentication cookies
const clearAuthCookies = () => {
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
};

// Thunk to fetch CSRF token
export const fetchCsrfToken = createAsyncThunk('auth/fetchCsrfToken', async () => {
  const response = await axiosInstance.get('/api/v1/get-csrf-token/');
  Cookies.set('csrftoken', response.data.csrfToken, { path: '/', secure: true, sameSite: 'None' });
  return response.data.csrfToken;
});

// Thunk to fetch current user information
export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async () => {
  try {
    const response = await axiosInstance.get('/api/v1/current_user/');
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      clearAuthCookies();
    }
    throw error;
  }
});

// Thunk to handle user login
export const loginUser = createAsyncThunk('auth/login', async (credentials, { dispatch }) => {
  const response = await axiosInstance.post('/api/v1/login/', credentials);
  const { access, refresh, user } = response.data;
  Cookies.set('access_token', access, { path: '/', secure: true, sameSite: 'None' });
  Cookies.set('refresh_token', refresh, { path: '/', secure: true, sameSite: 'None' });
  dispatch(setUser(user));
  return response.data;
});

// Thunk to handle user registration
export const registerUser = createAsyncThunk('auth/register', async (userData, { dispatch }) => {
  const response = await axiosInstance.post('/api/v1/register/', userData);
  const { access, refresh, user } = response.data;
  Cookies.set('access_token', access, { path: '/', secure: true, sameSite: 'None' });
  Cookies.set('refresh_token', refresh, { path: '/', secure: true, sameSite: 'None' });
  dispatch(setUser(user));
  return response.data;
});

// Thunk to handle user logout
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await axiosInstance.post('/api/v1/logout/');
  clearAuthCookies();
  return null;
});

// Thunk to refresh JWT token
export const refreshToken = createAsyncThunk('auth/refreshToken', async () => {
  const refresh = Cookies.get('refresh_token');
  if (!refresh) {
    throw new Error('No refresh token found');
  }
  const response = await axiosInstance.post('/api/v1/refresh/', { refresh });
  Cookies.set('access_token', response.data.access, { path: '/', secure: true, sameSite: 'None' });
  return response.data;
});

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    initialized: false,
  },
  reducers: {
    setInitialized: (state) => {
      state.initialized = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload || null;
        state.initialized = true;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.initialized = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        Cookies.set('access_token', action.payload.access, { path: '/', secure: true, sameSite: 'None' });
      })
      .addCase(refreshToken.rejected, (state) => {
        state.user = null;
      });
  },
});

export const { setInitialized, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
