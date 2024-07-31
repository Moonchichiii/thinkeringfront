import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosMultipartInstance } from '../services/api';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (params, { rejectWithValue }) => {
  try {
    const response = await axiosMultipartInstance.get('/api/posts/', { params });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchUserPosts = createAsyncThunk('posts/fetchUserPosts', async (_, { getState, rejectWithValue }) => {
  const { user } = getState().auth;
  try {
    const response = await axiosMultipartInstance.get('/api/posts/', {
      params: { author: user.id },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const createPost = createAsyncThunk('posts/createPost', async (postData, { rejectWithValue }) => {
  try {
    const response = await axiosMultipartInstance.post('/api/posts/', postData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
    next: null,
    previous: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload.results || [];
        state.next = action.payload.next;
        state.previous = action.payload.previous;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchUserPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload.results || [];
        state.next = action.payload.next;
        state.previous = action.payload.previous;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default postSlice.reducer;
