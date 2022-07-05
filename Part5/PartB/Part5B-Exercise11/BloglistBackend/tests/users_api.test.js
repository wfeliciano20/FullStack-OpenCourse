const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/user');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('secret', salt);

const intialUsers = [{ name: 'superUser', username: 'root', password: hash }];

describe('only valid users are created', () => {
	beforeEach(async () => {
		await User.deleteMany({}).exec();
		const user = new User(intialUsers[0]);
		await user.save();
	});

	test('creation fails with too short name', async () => {
		const usersAtStart = await User.find({}).exec();
		const newUser = { name: 'a', username: 'newUser', password: 'secret' };
		const result = await api.post('/api/users').send(newUser);
		expect(result.status).toBe(400);
		expect(result.body.error).toBe('name must be at least 3 characters long');
		const usersAtEnd = await User.find({}).exec();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);
	});

	test('creation fails with too short password', async () => {
		const usersAtStart = await User.find({}).exec();
		const newUser = { name: 'ang', username: 'newUser', password: 'se' };
		const result = await api.post('/api/users').send(newUser);
		expect(result.status).toBe(400);
		expect(result.body.error).toBe('password must be at least 3 characters long');
		const usersAtEnd = await User.find({}).exec();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);
	});

	test('creation fails with username not unique', async () => {
		const usersAtStart = await User.find({}).exec();
		const newUser = { name: 'ang', username: 'root', password: 'secret' };
		const result = await api.post('/api/users').send(newUser);
		expect(result.status).toBe(400);
		expect(result.body.error).toBe('username must be unique');
		const usersAtEnd = await User.find({}).exec();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);
	});

	test('creation succeeds with valid data', async () => {
		const usersAtStart = await User.find({}).exec();
		const newUser = { name: 'ang', username: 'ang', password: 'secret' };
		const result = await api.post('/api/users').send(newUser);
		expect(result.status).toBe(201);
		expect(result.body).toHaveProperty('username');
		expect(result.body).toHaveProperty('name');
		expect(result.body).toHaveProperty('id');
		const usersAtEnd = await User.find({}).exec();
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
	});
});

describe('when there is initially one user in db', () => {
	beforeEach(async () => {
		await User.deleteMany({});
		const userObject = new User({
			...intialUsers[0],
		});
		await userObject.save();
	}, 10000);

	test('creation succeeds with a fresh username', async () => {
		const response = await api.get('/api/users');
		const usersAtStart = JSON.parse(response.text);
		expect(usersAtStart).toHaveLength(1);

		const newUser = {
			username: 'mluukkai',
			name: 'Matti Luukkainen',
			password: 'salainen',
		};

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const response2 = await api.get('/api/users');
		const usersEnd = JSON.parse(response2.text);
		const usersAtEnd = usersEnd;
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

		const usernames = usersAtEnd.map((u) => u.username);
		expect(usernames).toContain(newUser.username);
	}, 10000);

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const response = await api.get('/api/users');
		const usersAtStart = JSON.parse(response.text);

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'salainen',
		};

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(result.body.error).toContain('username must be unique');

		const response2 = await api.get('/api/users');
		const usersAtEnd = JSON.parse(response2.text);
		expect(usersAtEnd).toEqual(usersAtStart);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
