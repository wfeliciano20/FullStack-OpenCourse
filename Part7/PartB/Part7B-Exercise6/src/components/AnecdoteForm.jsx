import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';

const AnecdoteForm = ({ addNew, setNotification }) => {
	const navigate = useNavigate();

	const { reset: contentReset, ...contentProps } = useField('text');
	const { reset: authorReset, ...authorProps } = useField('text');
	const { reset: infoReset, ...infoProps } = useField('text');

	const handleSubmit = (e) => {
		e.preventDefault();
		const content = contentProps.value;
		const author = authorProps.value;
		const info = infoProps.value;
		addNew({
			content: content,
			author: author,
			info: info,
			votes: 0,
		});
		navigate('/');
		setNotification(`${content} by ${author} was created`);
		setTimeout(() => {
			setNotification('');
		}, 5000);
	};

	const handleReset = (e) => {
		e.preventDefault();
		contentReset();
		authorReset();
		infoReset();
	};

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input name="content" {...contentProps} />
				</div>
				<div>
					author
					<input name="author" {...authorProps} />
				</div>
				<div>
					url for more info
					<input name="info" {...infoProps} />
				</div>
				<button>create</button>
				<button onClick={handleReset}>reset</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
