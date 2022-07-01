/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import CreateBlogForm from './components/CreateBlogForm';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [notification, setNotification] = useState(null);
	const [notificationType, setNotificationType] = useState(null);
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');
	const [refetch, setRefetch] = useState(true);

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

	return (
		<div>
			<Notification message={notification} type={notificationType} />
			<h2>blogs</h2>
			<p>{user.name} has logged in</p>
			<button onClick={handleLogout}>logout</button>
			<CreateBlogForm
				title={title}
				setTitle={setTitle}
				author={author}
				setAuthor={setAuthor}
				url={url}
				setUrl={setUrl}
				setRefetch={setRefetch}
				setNotification={setNotification}
				setNotificationType={setNotificationType}
			/>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
};

export default App;
