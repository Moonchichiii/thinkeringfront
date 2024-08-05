import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../services/api';

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      console.log('fetchDashboardData: Fetching dashboard data');
      await Promise.all([
        dispatch(fetchPosts()), // Dispatch action from posts slice
        dispatch(fetchProfile()),
        dispatch(fetchNotifications())
      ]);
    } catch (error) {
      console.error('fetchDashboardData: Error', error);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const fetchProfile = createAsyncThunk(
  'dashboard/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      console.log('fetchProfile: Fetching profile');
      const response = await axiosInstance.get('/api/v1/current_user/');
      console.log('fetchProfile: Profile fetched', response.data);
      return response.data.profile;
    } catch (error) {
      console.error('fetchProfile: Error', error);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const fetchNotifications = createAsyncThunk(
  'dashboard/fetchNotifications',
  async (_, { rejectWithValue }) => {
    try {
      console.log('fetchNotifications: Fetching notifications');
      const response = await axiosInstance.get('/api/v1/notifications/');
      console.log('fetchNotifications: Notifications fetched', response.data);
      return response.data;
    } catch (error) {
      console.error('fetchNotifications: Error', error);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Initial state
const initialState = {
  posts: [], // Remove or manage this state in another slice
  profile: null,
  notifications: [],
  status: 'idle',
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    resetDashboardState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboardData.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || "An error occurred while fetching dashboard data.";
      })
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchNotifications.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload || [];
        state.status = 'succeeded';
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetDashboardState } = dashboardSlice.actions;
export default dashboardSlice.reducer;
