import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';

const AnecdoteForm = ({ addNew, setNotification }) => {
	const navigate = useNavigate();

	const content = useField('text');
	const author = useField('text');
	const info = useField('text');

	const handleSubmit = (e) => {
		e.preventDefault();
		addNew({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0,
		});
		navigate('/');
		setNotification(`${content.value} by ${author.value} was created`);
		setTimeout(() => {
			setNotification('');
		}, 5000);
	};

	const handleReset = (e) => {
		e.preventDefault();
		content.reset();
		author.reset();
		info.reset();
	};

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input
						type={content.type}
						name="content"
						value={content.value}
						onChange={content.onChange}
					/>
				</div>
				<div>
					author
					<input
						type={author.type}
						name="author"
						value={author.value}
						onChange={author.onChange}
					/>
				</div>
				<div>
					url for more info
					<input
						type={info.type}
						name="info"
						value={info.value}
						onChange={info.onChange}
					/>
				</div>
				<button>create</button>
				<button onClick={handleReset}>reset</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
