import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notification: null,
};

//dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
// make and async thunk  using createAsyncThunk that gets the notification and the time to display it

export const setNotificationWithTimeout = (notification, time) => {
    return (dispatch) => {
        dispatch(setNotification(notification));
        setTimeout(() => {
            dispatch(resetNotification());
        }, time * 1000);
    };
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