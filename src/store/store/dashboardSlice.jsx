import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../services/ApiConfig';

export const fetchPosts = createAsyncThunk('dashboard/fetchPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/api/posts/');
    console.log('Posts:', response.data); // Debugging
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.log('Error:', error.response.data); // Debugging
      return rejectWithValue(error.response.data);
    }
    console.log('Error:', error.message); // Debugging
    return rejectWithValue(error.message);
  }
});

export const fetchProfile = createAsyncThunk('dashboard/fetchProfile', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/api/users/current_user/');
    console.log('Profile:', response.data.profile); // Debugging
    return response.data.profile; // Ensure the profile data is returned correctly
  } catch (error) {
    if (error.response && error.response.data) {
      console.log('Error:', error.response.data); // Debugging
      return rejectWithValue(error.response.data);
    }
    console.log('Error:', error.message); // Debugging
    return rejectWithValue(error.message);
  }
});

export const fetchNotifications = createAsyncThunk('dashboard/fetchNotifications', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/api/notifications/');
    console.log('Notifications:', response.data); // Debugging
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.log('Error:', error.response.data); // Debugging
      return rejectWithValue(error.response.data);
    }
    console.log('Error:', error.message); // Debugging
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
