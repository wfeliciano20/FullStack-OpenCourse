import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../Queries';
import jwt_decode from 'jwt-decode';

/**
 * TODO Use the Use Effect hook and the useState to store the book recomendations we will get from the useQuery
 * TODO Display the data
 * @param {*} props
 * @returns
 */

const Recommendations = (props) => {
	const token = localStorage.getItem('BooksAndAuthors-user-token');
	const decodedToken = jwt_decode(token);
	const options = {
		variables: {
			genre: decodedToken.favoriteGenre,
		},
	};
	const [books, setBooks] = useState([]);
	const { loading, error, data } = useQuery(ALL_BOOKS, options);
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
	return (
		<div>
			<h2>Recommendations</h2>
			<p>
				Books in your favorite genre <b>{decodedToken.favoriteGenre}</b>
			</p>
			<table>
				<tbody>
					<tr>
						<th>title</th>
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
		</div>
	);
};

export default Recommendations;
