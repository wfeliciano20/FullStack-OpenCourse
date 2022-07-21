import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { voteForAnecdote, selectAnecdotes } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
	const anecdotes = useSelector(selectAnecdotes);
	const dispatch = useDispatch();

	const vote = (id) => {
		dispatch(voteForAnecdote(id));
	};

	const sortAnecdotes = (anecdotes) => {
		return anecdotes.slice().sort((a, b) => b.votes - a.votes);
	};

	return (
		<div>
			{sortAnecdotes(anecdotes).map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={vote.bind(this, anecdote.id)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default AnecdoteList;
