import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosMultipartInstance } from '../services/ApiConfig';

export const createLike = createAsyncThunk('likes/createLike', async (likeData) => {
  const response = await axiosMultipartInstance.post('/api/likes/', likeData);
  return response.data;
});

const likeSlice = createSlice({
  name: 'likes',
  initialState: {
    likes: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createLike.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createLike.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.likes.push(action.payload);
      })
      .addCase(createLike.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default likeSlice.reducer;
