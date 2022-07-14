const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../utils/config');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
	const { username, password } = request.body;
	let user = await User.findOne({ username });

	const passwordCorrect =
		user === null ? false : bcrypt.compareSync(password, user.passwordHash);

	if (!(user && passwordCorrect)) {
		return response.status(401).json({
			error: 'invalid username or password',
		});
	}

	const userForToken = {
		username: user.username,
		id: user._id,
		v: 0,
	};

	// eslint-disable-next-line no-undef
	const accessToken = jwt.sign(userForToken, config.SECRET, {
		expiresIn: '5s',
	});

	const refreshToken = jwt.sign(userForToken, config.REFRESH_SECRET, {
		expiresIn: '1d',
	});

	const userWithRefresh = {
		username: user.username,
		name: user.name,
		passwordHash: user.passwordHash,
		blogs: user.blogs,
		refreshToken: refreshToken,
	};
	await User.findOneAndUpdate({ username: user.username }, userWithRefresh);

	response
		.status(200)
		.cookie('jwt', refreshToken, {
			httpOnly: true,
			sameSite: 'none',
			maxAge: 24 * 60 * 60 * 1000,
			secure: true,
		})
		.json({ accessToken, username: user.username, name: user.name });
});

module.exports = loginRouter;
