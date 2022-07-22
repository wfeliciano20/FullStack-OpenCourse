import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0,
    };
};

export const fetchAnecdotes = createAsyncThunk(
    'anecdotes/fetchAnecdotes',
    async() => {
        const response = await axios.get(baseUrl);
        return response.data;
    }
);

export const saveAnecdoteToDb = createAsyncThunk(
    'anecdotes/saveAnecdoteToDb',
    async(anecdote) => {
        const response = await axios.post(baseUrl, asObject(anecdote));
        return response.data;
    }
);

const initialState = {
    anecdotes: [],
};

const anecdotesSlice = createSlice({
    name: 'anecdotes',
    initialState,
    reducers: {
        addNewAnecdote: (state, action) => {
            state.anecdotes.push(asObject(action.payload));
        },
        voteForAnecdote: (state, action) => {
            const id = action.payload;

            state.anecdotes = state.anecdotes.map((anecdote) =>
                anecdote.id === id ?
                {
                    ...anecdote,
                    votes: anecdote.votes + 1,
                } :
                anecdote
            );
        },
    },
    extraReducers: {
        [fetchAnecdotes.fulfilled]: (state, action) => {
            state.anecdotes = action.payload;
        },
        [saveAnecdoteToDb.fulfilled]: (state, action) => {
            state.anecdotes.push(action.payload);
        },
    },
});

export const { addNewAnecdote, voteForAnecdote } = anecdotesSlice.actions;

export const selectAnecdotes = (state) => {
    return state.anecdotes.anecdotes;
};

export default anecdotesSlice.reducer;