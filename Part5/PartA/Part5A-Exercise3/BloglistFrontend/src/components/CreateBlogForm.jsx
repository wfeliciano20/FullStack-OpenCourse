import blogsServices from '../services/blogs';
const CreateBlogForm = ({
	title,
	setTitle,
	author,
	setAuthor,
	url,
	setUrl,
	setRefetch,
}) => {
	const handleCreateBlog = async (e) => {
		e.preventDefault();
		await blogsServices.create({
			title: title,
			author: author,
			url: url,
			likes: 0,
		});
		setTitle('');
		setAuthor('');
		setUrl('');
		setRefetch(true);
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
							onChange={({ target }) => setTitle(target.value)}
						/>
					</div>
					<div>
						author
						<input
							type="text"
							value={author}
							name="Author"
							onChange={({ target }) => setAuthor(target.value)}
						/>
					</div>
					<div>
						url
						<input
							type="text"
							value={url}
							name="Url"
							onChange={({ target }) => setUrl(target.value)}
						/>
					</div>
					<button type="submit">create</button>
				</div>
			</form>
		</div>
	);
};

export default CreateBlogForm;
