import {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAnecdotes, fetchAnecdotes, voteForAnecdoteToDb } from '../reducers/anecdotesSlice';
import {
	setNotification,
	resetNotification,
} from '../reducers/notificationSlice';
import { selectFilter } from '../reducers/filterSlice';

const AnecdoteList = () => {
	const anecdotes = useSelector(selectAnecdotes);
	const dispatch = useDispatch();
	let filter = useSelector(selectFilter);

	useEffect(() => {
		dispatch(fetchAnecdotes());
	}
	, []);


	const vote = (anecdote) => {
		dispatch(voteForAnecdoteToDb({...anecdote, votes: anecdote.votes + 1}));
		dispatch(setNotification(`You voted for '${anecdote.content}'`));
		setTimeout(() =>{
			dispatch(resetNotification());
		}, 5000);

	};

	const sortAnecdotes = (anecdotes) => {
		return anecdotes.slice().sort((a, b) => b.votes - a.votes);
	};
	if(filter === null){
		return (
			<div>
				{sortAnecdotes(anecdotes)
					.map((anecdote) => (
						<div key={anecdote.id}>
							<div>{anecdote.content}</div>
							<div>
								has {anecdote.votes}
								<button
									onClick={vote.bind(this, anecdote)}
								>
									vote
								</button>
							</div>
						</div>
					))}
			</div>
		);
	}

	return (
		<div>
			{sortAnecdotes(anecdotes).filter(anecdote => anecdote.content.toLowerCase().includes(filter)).map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={vote.bind(this, anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default AnecdoteList;
