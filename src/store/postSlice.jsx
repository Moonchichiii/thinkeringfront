import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance, axiosMultipartInstance } from '../services/api';

// Async thunks for posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (params, { rejectWithValue }) => {
  try {
    const response = await axiosMultipartInstance.get('/api/v1/posts/', { params });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const fetchUserPosts = createAsyncThunk('posts/fetchUserPosts', async (_, { getState, rejectWithValue }) => {
  const { user } = getState().auth;
  try {
    const response = await axiosMultipartInstance.get('/api/v1/posts/', {
      params: { author: user.id },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const createPost = createAsyncThunk('posts/createPost', async (postData, { rejectWithValue }) => {
  try {
    const response = await axiosMultipartInstance.post('/api/v1/posts/', postData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const approvePost = createAsyncThunk('posts/approvePost', async (postId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(`/api/v1/posts/${postId}/approve/`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const rejectPost = createAsyncThunk('posts/rejectPost', async (postId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`/api/v1/posts/${postId}/`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

// Initial state for posts
const initialState = {
  posts: [],
  userPosts: [],
  status: 'idle',
  error: null,
  next: null,
  previous: null,
};

// Post slice
const postSlice = createSlice({
  name: 'posts',
  initialState,
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
        state.userPosts = action.payload.results || [];
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
      })
      .addCase(approvePost.fulfilled, (state, action) => {
        console.log('Post approved:', action.payload);
      })
      .addCase(rejectPost.fulfilled, (state, action) => {
        console.log('Post rejected:', action.payload);
      });
  },
});

export default postSlice.reducer;
