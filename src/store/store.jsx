import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import postReducer from './postSlice';
import notificationReducer from './notificationSlice';
import likeReducer from './likeSlice';
import commentReducer from './commentSlice';
import ratingReducer from './ratingSlice';
import dashboardReducer from './dashboardSlice';
import followingReducer from './followingSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profiles: profileReducer,
    posts: postReducer,
    likes: likeReducer,
    ratings: ratingReducer,
    comments: commentReducer,
    notifications: notificationReducer,
    dashboard: dashboardReducer,
    following: followingReducer,
  },
});

export default store;
