import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosMultipartInstance } from '../services/api';

export const createRating = createAsyncThunk('ratings/createRating', async (ratingData) => {
  const response = await axiosMultipartInstance.post('/api/ratings/', ratingData);
  return response.data;
});

const ratingSlice = createSlice({
  name: 'ratings',
  initialState: {
    ratings: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRating.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createRating.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ratings.push(action.payload);
      })
      .addCase(createRating.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default ratingSlice.reducer;
