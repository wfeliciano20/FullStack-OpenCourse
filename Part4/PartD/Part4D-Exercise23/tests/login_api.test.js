const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/user');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('secret', salt);
const hash2 = bcrypt.hashSync('12345', salt);

const intialUsers = [
	{ name: 'superUser', username: 'root', passwordHash: hash },
	{ name: 'John Doe', username: 'jdoe', passwordHash: hash2 },
];

describe('only valid user and password will login', () => {
	beforeEach(async () => {
		await User.deleteMany({}).exec();
		const user = new User(intialUsers[0]);
		await user.save();
		const user2 = new User(intialUsers[1]);
		await user2.save();
	});

	test('login fails with invalid username', async () => {
		const result = await api
			.post('/api/login')
			.send({ username: 'invalid', password: 'secret' });
		expect(result.status).toBe(401);
		expect(result.body.error).toBe('invalid username or password');
	});

	test('login fails with invalid password', async () => {
		const result = await api
			.post('/api/login')
			.send({ username: 'root', password: 'invalid' });
		expect(result.status).toBe(401);
		expect(result.body.error).toBe('invalid username or password');
	});

	test('login succeeds with valid credentials', async () => {
		const result = await api
			.post('/api/login')
			.send({ username: 'root', password: 'secret' });
		expect(result.status).toBe(200);
		expect(result.body).toHaveProperty('token');
	}, 10000);
});

afterAll(() => {
	mongoose.connection.close();
});
