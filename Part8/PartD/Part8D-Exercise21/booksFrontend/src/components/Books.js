import { useQuery, useApolloClient } from '@apollo/client';
import { useState, useEffect } from 'react';
import { ALL_BOOKS } from '../Queries';

const Books = (props) => {
	const [books, setBooks] = useState([]);
	const [allBooks, setAllBooks] = useState([]);
	const [genres, setGenres] = useState([]);
	const [genre, setGenre] = useState(null);
	const client = useApolloClient();
	const options = {
		variables: {
			genre: genre,
		},
	};
	const { loading, error, data } = useQuery(ALL_BOOKS, options);
	useEffect(() => {
		if (data) {
			setAllBooks(data.allBooks);
			setBooks(data.allBooks);
			let set = new Set(data.allBooks.map((a) => a.genres).flat());
			if (genres.length === 0) {
				let genreArray = Array.from(set);
				genreArray.push('all genres');
				setGenres(genreArray);
			}
		}
	}, [data, genres.length]);

	if (!props.show) {
		return null;
	}
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :{error.message}</p>;

	// let set = new Set(data.allBooks.map((a) => a.genres).flat());
	// let genreArray = Array.from(set);
	// genreArray.push('all genres');
	// setGenres(genreArray);

	const filter = async (genre) => {
		if (genre === 'all genres') {
			setGenre(null);
			setBooks(allBooks);
		} else {
			setGenre(genre);
			const filteredData = client.readQuery({
				query: ALL_BOOKS,
				variables: { genre },
			});
			setBooks(filteredData.allBooks);
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
						<button
							key={'' + index + genre}
							style={{ marginRight: '5px' }}
							onClick={(e) => filter(genre)}
						>
							{genre}
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default Books;
