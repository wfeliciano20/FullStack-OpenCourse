import { useSelector, useDispatch } from 'react-redux';
import { voteForAnecdote } from './reducers/anecdoteReducer';
import AnecdoteForm from './components/AnecdoteForm';

const App = () => {
	const anecdotes = useSelector((state) => state);
	const dispatch = useDispatch();

	const vote = (id) => {
		dispatch(voteForAnecdote(id));
	};

	

	return (
		<div>
			<h2>Anecdotes</h2>
			<AnecdoteForm />
			{anecdotes.sort((a,b) => b.votes - a.votes).map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}

			
		</div>
	);
};

export default App;
