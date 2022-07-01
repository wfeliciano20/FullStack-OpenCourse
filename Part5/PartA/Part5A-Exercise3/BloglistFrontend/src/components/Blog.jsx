const Blog = ({ blog }) => (
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
			<strong>Likes:</strong> <strong>{blog.likes}</strong>
		</p>
	</div>
);

export default Blog;
