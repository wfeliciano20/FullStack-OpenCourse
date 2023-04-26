import { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Recommendations from './components/Recommendations';
import LoginForm from './components/LoginForm';

export const updateCache = (cache, query, addedBook) => {
	const uniqByName = (a) => {
		let seen = new Set();
		return a.filter((item) => {
			let k = item.name;
			return seen.has(k) ? false : seen.add(k);
		});
	};

	cache.updateQuery(query, (data) => {
		return {
			allBooks: uniqByName(data.concat(addedBook)),
		};
	});
};

const App = () => {
	const [page, setPage] = useState('authors');
	const [token, setToken] = useState(null);
	const client = useApolloClient();

	const logout = () => {
		setToken(null);
		localStorage.clear();
		client.resetStore();
	};

	useEffect(() => {
		const token = localStorage.getItem('BooksAndAuthors-user-token');
		setToken(token);
	}, []);

	if (!token) {
		return (
			<div>
				<LoginForm setToken={setToken} />
			</div>
		);
	}

	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				<button onClick={() => setPage('add')}>add book</button>
				<button onClick={() => setPage('recommendations')}>
					recommendations
				</button>
				{token ? <button onClick={logout}>logout</button> : null}
			</div>

			<Authors show={page === 'authors'} />

			<Books show={page === 'books'} />

			<Recommendations show={page === 'recommendations'} />

			<NewBook redirect={setPage} show={page === 'add'} />
		</div>
	);
};

export default App;
