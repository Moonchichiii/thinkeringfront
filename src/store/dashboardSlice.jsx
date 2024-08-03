import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../services/api';

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async (_, { dispatch, getState }) => {
    const { dashboard } = getState();
    if (dashboard.status !== 'idle') return;

    await Promise.all([
      dispatch(fetchPosts()),
      dispatch(fetchProfile()),
      dispatch(fetchNotifications())
    ]);
  }
);

export const fetchPosts = createAsyncThunk(
  'dashboard/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/v1/posts/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const fetchProfile = createAsyncThunk(
  'dashboard/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/v1/current_user/');
      return response.data.profile;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const fetchNotifications = createAsyncThunk(
  'dashboard/fetchNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/v1/notifications/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const approvePost = createAsyncThunk(
  'dashboard/approvePost',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/v1/posts/${postId}/approve/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const rejectPost = createAsyncThunk(
  'dashboard/rejectPost',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/v1/posts/${postId}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const initialState = {
  posts: [],
  profile: null,
  notifications: [],
  status: 'idle',
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    resetDashboardState: () => initialState, // Add a reset function
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
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload || [];
        state.status = 'succeeded';
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
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
      })
      .addCase(approvePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(approvePost.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(approvePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(rejectPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(rejectPost.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(rejectPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetDashboardState } = dashboardSlice.actions;
export default dashboardSlice.reducer;
