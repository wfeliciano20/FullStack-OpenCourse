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
	};

	// eslint-disable-next-line no-undef
	const accessToken = jwt.sign(userForToken, config.SECRET, {
		expiresIn: '1h',
	});

	const refreshToken = jwt.sign(userForToken, config.REFRESH_SECRET, {
		expiresIn: '1d',
	});

	const userWithRefresh = new User({
		username: user.username,
		name: user.name,
		passwordHash: user.passwordHash,
		blogs: user.blogs,
		refreshToken: refreshToken,
	});
	await userWithRefresh.save();

	response.cookie('jwt', refreshToken, {
		httpOnly: true,
		maxAge: 24 * 60 * 60 * 1000,
	});
	response
		.status(200)
		.send({ accessToken, username: user.username, name: user.name });
});

module.exports = loginRouter;
