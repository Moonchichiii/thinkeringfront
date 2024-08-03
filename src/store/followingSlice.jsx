import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../services/api';

// Thunks for following actions
export const fetchFollowing = createAsyncThunk('following/fetchFollowing', async () => {
  const response = await axiosInstance.get('/api/v1/followers/');
  return response.data;
});

export const followProfile = createAsyncThunk('following/followProfile', async (profileId) => {
  const response = await axiosInstance.post(`/api/v1/followers/${profileId}/follow/`);
  return response.data;
});

export const unfollowProfile = createAsyncThunk('following/unfollowProfile', async (profileId) => {
  const response = await axiosInstance.post(`/api/v1/followers/${profileId}/unfollow/`);
  return response.data;
});

// Following slice
const followingSlice = createSlice({
  name: 'following',
  initialState: {
    following: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowing.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.following = action.payload;
      })
      .addCase(fetchFollowing.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(followProfile.fulfilled, (state, action) => {
        state.following.push(action.payload);
      })
      .addCase(unfollowProfile.fulfilled, (state, action) => {
        state.following = state.following.filter(profile => profile.id !== action.payload.id);
      });
  },
});

export default followingSlice.reducer;
