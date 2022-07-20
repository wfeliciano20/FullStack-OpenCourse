import { useState } from 'react';

const CreateBlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

	const handleCreateBlog = async (event) => {
		event.preventDefault();
		await createBlog({
			title,
			author,
			url,
		});
		setTitle('');
		setAuthor('');
		setUrl('');
	};
	return (
		<div>
			{/* Form to create a  new blog entry */}
			<form onSubmit={handleCreateBlog}>
				<div>
					<h1>Create Blog</h1>
					<div>
						title
						<input
							type="text"
							value={title}
							name="Title"
							id="title"
							onChange={({ target }) => setTitle(target.value)}
						/>
					</div>
					<div>
						author
						<input
							type="text"
							value={author}
							name="Author"
							id="author"
							onChange={({ target }) => setAuthor(target.value)}
						/>
					</div>
					<div>
						url
						<input
							type="text"
							value={url}
							name="Url"
							id="url"
							onChange={({ target }) => setUrl(target.value)}
						/>
					</div>
					<button id="create" type="submit">
						create
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateBlogForm;
