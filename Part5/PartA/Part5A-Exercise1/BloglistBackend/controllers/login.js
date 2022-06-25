const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../utils/config');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
	const { username, password } = request.body;
	const user = await User.findOne({ username });

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
	const token = jwt.sign(userForToken, config.SECRET, { expiresIn: 60 * 60 });

	response
		.status(200)
		.send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
