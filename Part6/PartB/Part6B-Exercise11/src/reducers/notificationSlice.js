import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notification: null,
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.notification = action.payload;
        },
        resetNotification: (state, action) => {
            state.notification = null;
        },
    },
});

export const { setNotification, resetNotification } = notificationSlice.actions;

export const selectNotification = (state) => state.notification.notification;

export default notificationSlice.reducer;