import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../Queries';
import Select from 'react-select';

const Authors = (props) => {
	const { loading, error, data } = useQuery(ALL_AUTHORS);
	const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
	});
	const [born, setBorn] = useState(1920);
	const [selectedOption, setSelectedOption] = useState(null);

	if (!props.show) {
		return null;
	}

	if (loading) {
		return <p>loading...</p>;
	}

	if (error) {
		return <p>error...{error.message}</p>;
	}

	function onSubmit(e) {
		e.preventDefault();

		updateAuthor({
			variables: { name: selectedOption.value, setBornTo: born },
		});
		setBorn(1920);
		setSelectedOption(null);
	}

	const authors = data.allAuthors;

	const options = authors.map((author) => {
		return { value: author.name, label: author.name };
	});

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>

			<div>
				<h2>Set birth year</h2>
				<form onSubmit={(e) => onSubmit(e)}>
					<Select
						defaultValue={selectedOption}
						onChange={setSelectedOption}
						options={options}
					/>
					<label htmlFor="born">born:</label>
					<input
						type="number"
						name="born"
						id="born"
						value={born}
						onChange={({ target }) => setBorn(parseInt(target.value))}
					/>
					<button type="submit">Update Author</button>
				</form>
			</div>
		</div>
	);
};

export default Authors;
