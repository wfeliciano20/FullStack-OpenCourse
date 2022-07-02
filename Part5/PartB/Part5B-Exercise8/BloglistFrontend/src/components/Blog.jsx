import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, setRefetch }) => {
	const [showAll, setShowAll] = useState(false);
	const handleLike = async (e) => {
		e.preventDefault();
		await blogService.update(blog.id, {
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes + 1,
			user: blog.user.id,
		});
		setRefetch(true);
	};

	if (!showAll) {
		return (
			<div>
				<p>
					<strong>Blog Title:</strong> {blog.title} by {blog.author}
				</p>
				<button onClick={() => setShowAll(true)}>Show all</button>
			</div>
		);
	}
	return (
		<div>
			<p>
				<strong>Blog Title:</strong> {blog.title}
			</p>
			<p>
				<strong>Author:</strong> <strong>{blog.author}</strong>
			</p>
			<p>
				<strong>Url:</strong> <a href={blog.url}>{blog.url}</a>
			</p>
			<p>
				<strong>Likes:</strong> <strong>{blog.likes}</strong>{' '}
				<button onClick={handleLike}>Like</button>
			</p>
			<button onClick={() => setShowAll(false)}>Show less</button>
		</div>
	);
};

export default Blog;
