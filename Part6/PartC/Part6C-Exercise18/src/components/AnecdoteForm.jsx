import React from 'react';
import { useDispatch } from 'react-redux';
import { saveAnecdoteToDb } from '../reducers/anecdotesSlice';
import { setNotificationWithTimeout } from '../reducers/notificationSlice';

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const addAnecdote = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		dispatch(saveAnecdoteToDb(content));
		dispatch(setNotificationWithTimeout(`Anecdote '${content}' created`, 5));
		event.target.anecdote.value = '';
	};
	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div>
					<input name="anecdote" />
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
