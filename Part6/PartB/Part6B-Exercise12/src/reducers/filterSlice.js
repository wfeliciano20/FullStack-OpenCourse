import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filter: null,
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        resetFilter: (state, action) => {
            state.filter = null;
        },
    },
});

export const { setFilter, resetFilter } = filterSlice.actions;

export const selectFilter = (state) => state.filter.filter;

export default filterSlice.reducer;