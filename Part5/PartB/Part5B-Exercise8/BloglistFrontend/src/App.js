/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import CreateBlogForm from './components/CreateBlogForm';
import Togglable from './components/Togglable';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [notification, setNotification] = useState(null);
	const [notificationType, setNotificationType] = useState(null);
	const [refetch, setRefetch] = useState(true);
	const blogFormRef = useRef();

	useEffect(() => {
		const fetchTodos = async () => {
			try {
				const blogs = await blogService.getAll();
				setBlogs(blogs);
			} catch (error) {
				setNotificationType('error');
				setNotification(error.message);
				setTimeout(() => {
					setNotification(null);
				}, 5000);
			}
		};
		if (refetch) {
			fetchTodos();
		}
		setRefetch(false);
	}, [refetch]);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});
			setUser(user);
			window.localStorage.setItem(
				'loggedBloglistAppUser',
				JSON.stringify(user),
			);
			blogService.setToken(user.token);
			setUsername('');
			setPassword('');
		} catch (error) {
			setNotification(error.response.data.error);
			setNotificationType('error');
			setTimeout(() => {
				setNotification(null);
			}, 5000);
		}
	};

	if (user === null) {
		return (
			<LoginForm
				username={username}
				setUsername={setUsername}
				password={password}
				setPassword={setPassword}
				handleLogin={handleLogin}
				notification={notification}
				notificationType={notificationType}
			/>
		);
	}

	const handleLogout = (e) => {
		e.preventDefault();
		setUser(null);
		window.localStorage.removeItem('loggedBloglistAppUser');
	};

	const handleCreateBlog = async (newBlog) => {
		const { title, author, url } = newBlog;
		try {
			const createdBlog = await blogService.create({
				title: title,
				author: author,
				url: url,
				likes: 0,
			});
			setBlogs(blogs.concat(createdBlog));
			setRefetch(true);
			// eslint-disable-next-line quotes
			setNotification(`Blog ${title} by ${author} added`);
			setNotificationType('success');
			blogFormRef.current.toggleVisibility();
			setTimeout(() => {
				setNotification(null);
			}, 5000);
		} catch (error) {
			setNotification(error.response.data.error);
			setNotificationType('error');
			setTimeout(() => {
				setNotification(null);
			}, 5000);
		}
	};

	return (
		<div>
			<Notification message={notification} type={notificationType} />
			<h2>blogs</h2>
			<p>{user.name} has logged in</p>
			<button onClick={handleLogout}>logout</button>
			<Togglable buttonLabel="new blog" ref={blogFormRef}>
				<CreateBlogForm createBlog={handleCreateBlog} />
			</Togglable>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} setRefetch={setRefetch} />
			))}
		</div>
	);
};

export default App;
