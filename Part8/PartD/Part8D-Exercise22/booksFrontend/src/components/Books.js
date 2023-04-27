import { useQuery, useApolloClient, useSubscription } from '@apollo/client';
import { useState, useEffect } from 'react';
import { ALL_BOOKS, BOOK_ADDED } from '../Queries';
import { updateCache } from '../App';

const Books = (props) => {
	const [allBooks, setAllBooks] = useState([]);
	const [genres, setGenres] = useState([]);
	const [genre, setGenre] = useState(null);
	const client = useApolloClient();

	const options = {
		variables: {
			genre: genre,
		},
	};

	const { loading, error, data, refetch } = useQuery(ALL_BOOKS, options);

	useSubscription(BOOK_ADDED, {
		onData: ({ data, client }) => {
			console.log('subscription');
			alert(`New book added: ${data.bookAdded.title}`);
			const addedBook = data.bookAdded;
			updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
		},
	});

	useEffect(() => {
		if (data) {
			refetch();
			setAllBooks(data.allBooks);
			if (genres.length === 0) {
				const uniqueGenres = Array.from(
					new Set(data.allBooks.map((a) => a.genres).flat())
				);
				setGenres([...uniqueGenres, 'all genres']);
			}
		}
	}, [data, genres, refetch]);

	if (!props.show) {
		return null;
	}

	if (loading) return <p>Loading...</p>;

	if (error) return <p>Error:{error.message}</p>;

	const filter = (genre) => {
		if (genre === 'all genres') {
			setGenre(null);
			setAllBooks(data.allBooks);
		} else {
			setGenre(genre);
			const filteredData = client.readQuery({
				query: ALL_BOOKS,
				variables: { genre },
			});
			console.log('filtered', filteredData?.allBooks);
			if (filteredData) {
				setAllBooks(filteredData?.allBooks);
			}
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
					{allBooks.map((a) => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div style={{ marginTop: '20px' }}>
				{genres.map((genre, index) => (
					<button
						key={'' + index + genre}
						style={{ marginRight: '5px' }}
						onClick={() => filter(genre)}
					>
						{genre}
					</button>
				))}
			</div>
		</div>
	);
};

export default Books;

// import { useQuery, useApolloClient, useSubscription } from '@apollo/client';
// import { useState, useEffect } from 'react';
// import { ALL_BOOKS, BOOK_ADDED } from '../Queries';
// import { updateCache } from '../App';

// const Books = (props) => {
// 	const [books, setBooks] = useState([]);
// 	const [allBooks, setAllBooks] = useState([]);
// 	const [genres, setGenres] = useState([]);
// 	const [genre, setGenre] = useState(null);
// 	const client = useApolloClient();

// 	const options = {
// 		variables: {
// 			genre: genre,
// 		},
// 	};

// 	const { loading, error, data } = useQuery(ALL_BOOKS, options);

// 	useSubscription(BOOK_ADDED, {
// 		onData: ({ data, client }) => {
// 			const addedBook = data.data.bookAdded;
// 			updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
// 		},
// 	});
// 	// useEffect(() => {
// 	// 	const subscription = client.subscribe({ query: BOOK_ADDED }).subscribe({
// 	// 		next: ({ data }) => {
// 	// 			console.log('BOOK_ADDED_DATA' + data);
// 	// 			const addedBook = data.bookAdded;
// 	// 			setAllBooks(allBooks.concat(addedBook));
// 	// 			if (!genre || addedBook.genres.includes(genre)) {
// 	// 				console.log('adding book from subscription');
// 	// 				setBooks(books.concat(addedBook));
// 	// 			}
// 	// 		},
// 	// 	});

// 	// 	return () => {
// 	// 		subscription.unsubscribe();
// 	// 	};
// 	// }, [allBooks, books, client, genre]);

// 	useEffect(() => {
// 		if (data) {
// 			setAllBooks(data.allBooks);
// 			setBooks(data.allBooks);
// 			if (genres.length === 0) {
// 				let set = new Set(data.allBooks.map((a) => a.genres).flat());
// 				let genreArray = Array.from(set);
// 				genreArray.push('all genres');
// 				setGenres(genreArray);
// 			}
// 		}
// 	}, [data, genres]);

// 	if (!props.show) {
// 		return null;
// 	}
// 	if (loading) return <p>Loading...</p>;
// 	if (error) return <p>Error:{error.message}</p>;

// 	// let set = new Set(data.allBooks.map((a) => a.genres).flat());
// 	// let genreArray = Array.from(set);
// 	// genreArray.push('all genres');
// 	// setGenres(genreArray);

// 	const filter = async (genre) => {
// 		if (genre === 'all genres') {
// 			setGenre(null);
// 			setBooks(allBooks);
// 		} else {
// 			setGenre(genre);
// 			const filteredData = client.readQuery({
// 				query: ALL_BOOKS,
// 				variables: { genre },
// 			});
// 			console.log('filtered data: ' + filteredData);
// 			setBooks(filteredData.allBooks);
// 		}
// 	};

// 	return (
// 		<div>
// 			<h2>books</h2>

// 			<table>
// 				<tbody>
// 					<tr>
// 						<th></th>
// 						<th>author</th>
// 						<th>published</th>
// 					</tr>
// 					{books.map((a) => (
// 						<tr key={a.title}>
// 							<td>{a.title}</td>
// 							<td>{a.author.name}</td>
// 							<td>{a.published}</td>
// 						</tr>
// 					))}
// 				</tbody>
// 			</table>
// 			<div style={{ marginTop: '20px' }}>
// 				{genres.map((genre, index) => {
// 					return (
// 						<button
// 							key={'' + index + genre}
// 							style={{ marginRight: '5px' }}
// 							onClick={(e) => filter(genre)}
// 						>
// 							{genre}
// 						</button>
// 					);
// 				})}
// 			</div>
// 		</div>
// 	);
// };

// export default Books;
