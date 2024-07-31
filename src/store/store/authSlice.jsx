import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../services/ApiConfig';
import Cookies from 'js-cookie';

const clearAuthCookies = () => {
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
};

export const fetchCsrfToken = createAsyncThunk('auth/fetchCsrfToken', async () => {
  const response = await axiosInstance.get('/api/chatbot/get-csrf-token/');
  console.log('CSRF Token:', response.data.csrfToken);
  Cookies.set('csrftoken', response.data.csrfToken, { path: '/', secure: true, sameSite: 'None' });
  return response.data.csrfToken;
});

export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async () => {
  try {
    const response = await axiosInstance.get('/api/users/current_user/');
    console.log('Current User:', response.data);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      clearAuthCookies();
    }
    throw error;
  }
});

export const loginUser = createAsyncThunk('auth/login', async (credentials, { dispatch }) => {
  const response = await axiosInstance.post('/api/users/login/', credentials);
  console.log('Login Response:', response.data);
  const { access, refresh, user } = response.data;
  Cookies.set('access_token', access, { path: '/', secure: true, sameSite: 'None' });
  Cookies.set('refresh_token', refresh, { path: '/', secure: true, sameSite: 'None' });
  dispatch(setUser(user));
  dispatch(fetchCurrentUser());
  return response.data;
});

export const registerUser = createAsyncThunk('auth/register', async (userData, { dispatch }) => {
  const response = await axiosInstance.post('/api/users/register/', userData);
  console.log('Register Response:', response.data);
  const { access, refresh, user } = response.data;
  Cookies.set('access_token', access, { path: '/', secure: true, sameSite: 'None' });
  Cookies.set('refresh_token', refresh, { path: '/', secure: true, sameSite: 'None' });
  dispatch(setUser(user));
  dispatch(fetchCurrentUser());
  return response.data;
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await axiosInstance.post('/api/users/logout/', {}, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  clearAuthCookies();
  return null;
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async () => {
  const refresh = Cookies.get('refresh_token');
  if (!refresh) {
    throw new Error('No refresh token found');
  }
  const response = await axiosInstance.post('/api/users/refresh/', { refresh });
  console.log('Refresh Token Response:', response.data);
  Cookies.set('access_token', response.data.access, { path: '/', secure: true, sameSite: 'None' });
  return response.data;
});

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
        console.log('Fetch Current User Fulfilled:', action.payload);
        state.user = action.payload || null;
        state.initialized = true;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        console.log('Fetch Current User Rejected');
        state.user = null;
        state.initialized = true;
      })
      .addCase(loginUser.pending, (state) => {
        console.log('Login User Pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('Login User Fulfilled:', action.payload);
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log('Login User Rejected:', action.error.message);
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        console.log('Register User Pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log('Register User Fulfilled:', action.payload);
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log('Register User Rejected:', action.error.message);
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        console.log('Logout User Fulfilled');
        state.user = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        console.log('Refresh Token Fulfilled:', action.payload);
        Cookies.set('access_token', action.payload.access, { path: '/', secure: true, sameSite: 'None' });
      })
      .addCase(refreshToken.rejected, (state) => {
        console.log('Refresh Token Rejected');
        state.user = null;
      });
  },
});

export const { setInitialized, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
