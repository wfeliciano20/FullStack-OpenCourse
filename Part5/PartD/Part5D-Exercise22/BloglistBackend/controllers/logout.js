const logoutRouter = require('express').Router();
const User = require('../models/user');

logoutRouter.get('/', async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(401);
	const refreshToken = cookies.jwt;
	const users = await User.find({});
	const foundUser = users.find((user) => user.refreshToken === refreshToken);
	if (!foundUser) {
		res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
		return res.sendStatus(204);
	}
	await User.findByIdAndUpdate(foundUser.id, {
		username: foundUser.username,
		name: foundUser.name,
		passwordHash: foundUser.passwordHash,
		refreshToken: '',
		blogs: foundUser.blogs,
	}).exec();
	return res
		.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
		.sendStatus(204);
});

module.exports = logoutRouter;
