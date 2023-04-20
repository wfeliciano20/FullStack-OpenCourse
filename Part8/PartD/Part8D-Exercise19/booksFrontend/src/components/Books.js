import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { ALL_BOOKS } from '../Queries';

const Books = (props) => {
	const { loading, error, data } = useQuery(ALL_BOOKS);
	const [books, setBooks] = useState([]);

	useEffect(() => {
		if (!loading && !error) {
			setBooks(data.allBooks);
		}
	}, [data, error, loading]);

	if (!props.show) {
		return null;
	}
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :{error.message}</p>;

	let set = new Set(data.allBooks.map((a) => a.genres).flat());
	const genres = Array.from(set);
	genres.push('all genres');

	const filter = (genre) => {
		if (genre === 'all genres') {
			setBooks(data.allBooks);
		} else {
			setBooks(data.allBooks.filter((b) => b.genres.includes(genre)));
		}
	};

	return (
		<div>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books.map((a) => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div style={{ marginTop: '20px' }}>
				{genres.map((genre, index) => {
					return (
						<button key={index} onClick={(e) => filter(genre)}>
							{genre}
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default Books;
