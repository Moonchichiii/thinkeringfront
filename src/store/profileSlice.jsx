import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance, axiosMultipartInstance } from '../services/api';

export const fetchProfiles = createAsyncThunk('profiles/fetchProfiles', async () => {
  const response = await axiosInstance.get('/api/profiles/');
  return response.data;
});

export const updateProfile = createAsyncThunk('profiles/updateProfile', async (profileData) => {
  const response = await axiosMultipartInstance.put(`/api/profiles/${profileData.get('id')}/`, profileData);
  return response.data;
});

const profileSlice = createSlice({
  name: 'profiles',
  initialState: {
    profiles: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profiles = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        const index = state.profiles.findIndex(profile => profile.id === action.payload.id);
        if (index !== -1) {
          state.profiles[index] = action.payload;
        }
      });
  },
});

export default profileSlice.reducer;
