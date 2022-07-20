import PropTypes from 'prop-types';
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
						id="username"
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						id="password"
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button id="login-button" type="submit">
					login
				</button>
			</form>
		</div>
	);
};

LoginForm.propTypes = {
	handleLogin: PropTypes.func.isRequired,
	setUsername: PropTypes.func.isRequired,
	setPassword: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	notification: PropTypes.string.isRequired,
	notificationType: PropTypes.string.isRequired,
};

export default LoginForm;
