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

describe('refreshToken', () => {
	test('refreshing with a valid token returns a new accessToken', async () => {
		const response = await api
			.post('/api/login')
			.send({ username: 'jdoe1', password: newUserPassword });
		const cookies = response.get('Set-Cookie');
		const token = cookies[0].split('; ')[0].split('=')[1];
		const refreshToken = token;
		const accessToken = response.body.accessToken;
		const response2 = await api.get('/api/refresh').set('Cookie', `jwt=${token}`);
		expect(response2.status).toBe(200);
		const user = await User.findOne({ username: 'jdoe1' });
		expect(user.refreshToken).not.toBe(refreshToken);
		expect(response2.body.accessToken).toEqual(
			expect.not.stringContaining(accessToken),
		);
	}, 10000);
}, 10000);

afterAll(() => {
	mongoose.connection.close();
});
