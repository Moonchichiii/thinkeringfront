import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alerts',
  initialState: {
    messages: [],
  },
  reducers: {
    addAlert: (state, action) => {
      state.messages.push(action.payload);
    },
    removeAlert: (state, action) => {
      state.messages = state.messages.filter(msg => msg.id !== action.payload);
    },
    clearAlerts: (state) => {
      state.messages = [];
    },
  },
});

export const { addAlert, removeAlert, clearAlerts } = alertSlice.actions;
export default alertSlice.reducer;
