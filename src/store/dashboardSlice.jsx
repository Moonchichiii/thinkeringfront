import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../services/api';

export const fetchPosts = createAsyncThunk('dashboard/fetchPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/api/posts/');
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error.message);
  }
});

export const fetchProfile = createAsyncThunk('dashboard/fetchProfile', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/api/users/current_user/');
    return response.data.profile;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error.message);
  }
});

export const fetchNotifications = createAsyncThunk('dashboard/fetchNotifications', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/api/notifications/');
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error.message);
  }
});

const initialState = {
  posts: [],
  profile: null,
  notifications: [],
  error: null,
  status: 'idle',
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload || [];
        state.status = 'succeeded';
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.status = 'failed';
      })
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.status = 'failed';
      })
      .addCase(fetchNotifications.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload || [];
        state.status = 'succeeded';
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.status = 'failed';
      });
  },
});

export default dashboardSlice.reducer;
