/* eslint-disable no-unused-vars */
import { useState } from 'react';
import useBlogService from '../hooks/useBlogService';

const Blog = ({ blog, setNotification, setNotificationType, setRefetch }) => {
	// const [getAll, create, update, deleteBlog] = useBlogService();

	const [showAll, setShowAll] = useState(false);
	const handleLike = async (e) => {
		e.preventDefault();
		// try {
		// 	await update(blog.id, {
		// 		title: blog.title,
		// 		author: blog.author,
		// 		url: blog.url,
		// 		likes: blog.likes + 1,
		// 		user: blog.user.id,
		// 	});
		// 	setRefetch(true);
		// } catch (error) {
		// 	setNotification(`Error: ${error.response.data.error}`);
		// 	setNotificationType('error');
		// 	setTimeout(() => {
		// 		setNotification(null);
		// 	}, 5000);
		// }
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		// try {
		// 	if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
		// 		await deleteBlog(blog.id);
		// 		setRefetch(true);
		// 	}
		// } catch (error) {
		// 	setNotification(`Error: ${error.response.data.error}`);
		// 	setNotificationType('error');
		// 	setTimeout(() => {
		// 		setNotification(null);
		// 	}, 5000);
		// }
	};

	if (!showAll) {
		return (
			<div className="blog-default-view">
				<p>
					<strong>Blog Title:</strong> {blog.title} by {blog.author}
				</p>
				<button onClick={handleDelete}>Delete Blog</button>
				<button onClick={() => setShowAll(true)}>Show all</button>
			</div>
		);
	}
	return (
		<div className="blog-default-view">
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
			<button onClick={handleDelete}>Delete Blog</button>
			<button onClick={() => setShowAll(false)}>Show less</button>
		</div>
	);
};

export default Blog;
