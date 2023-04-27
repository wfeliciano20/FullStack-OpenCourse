import { useMutation } from '@apollo/client';

import { useState } from 'react';
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../Queries';
import { updateCache } from '../App';

const NewBook = ({ redirect, show }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [published, setPublished] = useState('');
	const [genre, setGenre] = useState('');
	const [genres, setGenres] = useState([]);

	const [addBook] = useMutation(ADD_BOOK, {
		// update: (cache, { data: { addBook } }) => {
		// 	updateCache(client.cache, { query: ALL_BOOKS }, addBook);
		// 	updateCache(client.cache, { query: ALL_AUTHORS }, addBook.author);
		// },

		update: (cache, response) => {
			updateCache(cache, { query: ALL_BOOKS }, response.data.addPerson);
		},
		refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
	});

	if (!show) {
		return null;
	}

	const submit = async (event) => {
		event.preventDefault();

		console.log('add book...');
		let year = parseInt(published);
		addBook({ variables: { title, published: year, author, genres } });
		redirect('books');
		setTitle('');
		setPublished('');
		setAuthor('');
		setGenres([]);
		setGenre('');
	};

	const addGenre = () => {
		setGenres(genres.concat(genre));
		setGenre('');
	};

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					title
					<input
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					published
					<input
						type="number"
						value={published}
						onChange={({ target }) => setPublished(target.value)}
					/>
				</div>
				<div>
					<input
						value={genre}
						onChange={({ target }) => setGenre(target.value)}
					/>
					<button onClick={addGenre} type="button">
						add genre
					</button>
				</div>
				<div>genres: {genres.join(' ')}</div>
				<button type="submit">create book</button>
			</form>
		</div>
	);
};

export default NewBook;
