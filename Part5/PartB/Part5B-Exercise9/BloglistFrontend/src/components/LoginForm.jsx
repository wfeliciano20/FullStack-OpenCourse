// eslint-disable-next-line no-unused-vars
import Notification from './Notification';

const LoginForm = ({
	username,
	setUsername,
	password,
	setPassword,
	handleLogin,
	notification,
	notificationType,
}) => {
	return (
		<div>
			<Notification message={notification} type={notificationType} />
			<form onSubmit={handleLogin}>
				<div>
					<h1>Login</h1>
					username
					<input
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	);
};

export default LoginForm;
