import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../services/api';

// Thunk to fetch user profile
export const fetchProfile = createAsyncThunk('profiles/fetchProfile', async () => {
  const response = await axiosInstance.get('/api/v1/current_user/');
  return response.data.profile;
});

// Define the initial state
const initialState = {
  profile: null,
  status: 'idle',
  error: null,
};

// Create the slice
const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
