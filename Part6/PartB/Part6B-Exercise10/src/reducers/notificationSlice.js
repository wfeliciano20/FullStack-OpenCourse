import { createSlice } from '@reduxjs/toolkit';

const initialState ={
  notification: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notification = action.payload;
    }
  }
});

export const {setNotification} = notificationSlice.actions;

export const selectNotification = state => state.notification.notification;

export default notificationSlice.reducer;