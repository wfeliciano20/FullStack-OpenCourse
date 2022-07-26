const AnecdoteList = ({ anecdotes, vote, setNotification }) => {
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
			<h2>Anecdotes</h2>
			<ul>
				{anecdotes.map((anecdote) => (
					<li key={anecdote.id}>
						<div>
							<p>{anecdote.content}</p>
							<p>{anecdote.authors}</p>
							<p>{anecdote.info}</p>
							<p>
								votes: {anecdote.votes}{' '}
								<button onClick={() => handleVote(anecdote)}>Vote</button>{' '}
							</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AnecdoteList;
