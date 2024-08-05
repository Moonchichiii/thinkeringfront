import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../services/api';
import Cookies from 'js-cookie';

// Thunk to fetch current user information
export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async () => {
  const response = await axiosInstance.get('/api/v1/current_user/');
  return response.data;
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
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
  return null;
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
      });
  },
});

export const { setInitialized, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
