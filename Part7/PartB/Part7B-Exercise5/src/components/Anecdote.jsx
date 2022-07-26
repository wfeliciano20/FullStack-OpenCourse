import React from 'react';

const Anecdote = ({ anecdote, vote, setNotification }) => {
	const handleVote = (anecdote) => {
		vote(anecdote.id);
		setNotification(
			`anecdote with content: ${anecdote.content} received a vote`
		);
		setTimeout(() => {
			setNotification('');
		}, 5000);
	};
	return (
		<div>
			<p>{anecdote.content}</p>
			<p>{anecdote.authors}</p>
			<a href={anecdote.info}>{anecdote.info}</a>
			<p>
				votes: {anecdote.votes}{' '}
				<button onClick={() => handleVote(anecdote)}>Vote</button>{' '}
			</p>
		</div>
	);
};

export default Anecdote;
