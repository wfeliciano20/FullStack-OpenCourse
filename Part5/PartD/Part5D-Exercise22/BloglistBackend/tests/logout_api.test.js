/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const supertest = require('supertest');
const config = require('../utils/config');
const app = require('../app');
const User = require('../models/user');
const api = supertest(app);

const newUserPassword = 'doe123';

beforeEach(async () => {
	await User.deleteMany({});
	const salt = bcrypt.genSaltSync(10);

	let hash = bcrypt.hashSync(newUserPassword, salt);
	const newUser = new User({
		username: 'jdoe1',
		name: 'John Doe',
		passwordHash: hash,
		refreshToken: '',
		blogs: [],
	});
	await newUser.save();
}, 10000);

// create a test where we login the user and then logged the user out
describe('logout', () => {
	test('logout user', async () => {
		const response = await api
			.post('/api/login')
			.send({ username: 'jdoe1', password: newUserPassword });
		expect(response.status).toBe(200);
		const cookies = response.get('Set-Cookie');
		//console.log(cookies);
		const token = cookies[0].split('; ')[0].split('=')[1];
		//console.log(token);
		const refreshToken = token;
		// do a get request to logout and attacheed the jwt cookie
		const response2 = await api.get('/api/logout').set('Cookie', `jwt=${token}`);
		expect(response2.status).toBe(204);
		const user = await User.findOne({ username: 'jdoe1' });
		expect(user.refreshToken).toBe('');
	}, 10000);

	test('logout a user without a refresh token', async () => {
		const response = await api
			.post('/api/login')
			.send({ username: 'jdoe1', password: newUserPassword });
		const response2 = await api.get('/api/logout');
		expect(response2.status).toBe(401);
	}, 10000);

	test('logout a user with an invalid refresh token', async () => {
		const response = await api
			.post('/api/login')
			.send({ username: 'jdoe1', password: newUserPassword });
		// get a invalid refresh token
		const userForToken = {
			username: 'bob',
			id: 'nucoieuo',
		};
		const refreshToken = jwt.sign(userForToken, config.REFRESH_SECRET, {
			expiresIn: '1d',
		});
		const response2 = await api
			.get('/api/logout')
			.set('Cookie', `jwt=${refreshToken}`);
		expect(response2.status).toBe(204);
	}, 10000);
}, 10000);

afterAll(() => {
	mongoose.connection.close();
});
