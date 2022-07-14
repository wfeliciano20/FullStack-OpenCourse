const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const refreshRouter = require('express').Router();
const User = require('../models/user');

refreshRouter.get('/', async (req, res) => {
	let cookies = req.get('Set-Cookie');
	let refreshToken;
	if (!cookies) {
		cookies = req.cookies.jwt;
		refreshToken = req.cookies.jwt;
	}
	if (req.get('Set-Cookie')) {
		refreshToken = cookies[0].split('; ')[0].split('=')[1];
	}
	if (!cookies) {
		return res.sendStatus(401);
	}

	const users = await User.find({});
	const foundUser = users.find((user) => user.refreshToken === refreshToken);
	if (!foundUser) {
		return res.sendStatus(403);
	}
	try {
		const decoded = jwt.verify(refreshToken, config.REFRESH_SECRET);
		if (foundUser.username !== decoded.username) throw new Error('Invalid user');
		let newV = decoded.v + 1;
		const userForToken = {
			username: decoded.username,
			id: foundUser._id,
			v: newV,
		};
		const accessToken = jwt.sign(userForToken, config.SECRET, {
			expiresIn: '1h',
		});
		const newRefreshToken = jwt.sign(userForToken, config.REFRESH_SECRET, {
			expiresIn: '1d',
		});
		await User.findByIdAndUpdate(foundUser._id, {
			username: foundUser.username,
			name: foundUser.name,
			passwordHash: foundUser.passwordHash,
			refreshToken: newRefreshToken,
			blogs: foundUser.blogs,
		}).exec();
		res
			.status(200)
			.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
			.cookie('jwt', newRefreshToken, {
				httpOnly: true,
				sameSite: 'none',
				maxAge: 24 * 60 * 60 * 1000,
				secure: true,
			})
			.json({ accessToken, username: foundUser.username, name: foundUser.name });
	} catch (error) {
		return res.sendStatus(403);
	}
});

module.exports = refreshRouter;
