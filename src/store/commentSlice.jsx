import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../services/api';

export const fetchComments = createAsyncThunk('comments/fetchComments', async ({ postId }) => {
  const response = await axiosInstance.get(`/api/comments/?post_id=${postId}`);
  return response.data;
});

export const createComment = createAsyncThunk('comments/createComment', async (commentData) => {
  const response = await axiosInstance.post('/api/comments/', commentData);
  return response.data;
});

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      });
  },
});

export default commentSlice.reducer;
