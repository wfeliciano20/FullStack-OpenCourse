const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/user');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('secret', salt);

const intialUsers = [
    { name: 'superUser', username: 'root', password: hash }
];
describe('when there is initially one user in db', () => {

    beforeEach(async() => {

        await User.deleteMany({});
        const userObject = new User({
            ...intialUsers[0]
        });
        await userObject.save();
      
    }, 10000);



    test('creation succeeds with a fresh username', async() => {
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

        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    },10000);

    test('creation fails with proper statuscode and message if username already taken', async() => {
        const response = await api.get('/api/users');
        const usersAtStart =JSON.parse(response.text);

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