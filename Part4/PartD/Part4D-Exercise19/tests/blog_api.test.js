const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const api = supertest(app);

const initialBlogs = [{
    title: 'Learning Mern',
    author: 'John Doe',
    url: 'http://localhost:3003/api/blogs',
    likes: 10
},
{
    title: 'Learning Express',
    author: 'Jane Doe',
    url: 'http://localhost:3003/api/blogs',
    likes: 20
}
];

beforeEach(async() => {
    await User.deleteMany({});
    await Blog.deleteMany({});
    const salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync('doe123', salt);
    const newUser = new User({
        username: 'jdoe1',
        name: 'John Doe',
        passwordHash: hash
    });
    await newUser.save();

    hash = bcrypt.hashSync('Doe345', salt);
    const newUser2 = new User({
        username: 'janed1',
        name: 'Jane Doe',
        passwordHash: hash
    });
    await newUser2.save();


    hash = bcrypt.hashSync('jackD123', salt);
    const newUser3 = new User({
        username: 'jackdoe',
        name: 'Jack Doe',
        passwordHash: hash
    });
    await newUser3.save();
    const blogObject1 = new Blog({
        ...initialBlogs[0],
        user: newUser._id
    });
    await blogObject1.save();
    const blogObject2 = new Blog({
        ...initialBlogs[1],
        user: newUser2._id
    });
    await blogObject2.save();

});

describe('there are 2 blogs initially', () => {
    test('blogs are returned as json', async() => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('there are two blogs', async() => {
        const response = await api.get('/api/blogs');
        expect(response.body).toHaveLength(initialBlogs.length);
    });

    test('the first Blog is about Learning Mern', async() => {
        const response = await api.get('/api/Blogs');

        const titles = response.body.map(r => r.title);
        expect(titles).toContain(
            'Learning Mern'
        );
    });

    test('check the blogs have an id', async() => {
        const response = await api.get('/api/Blogs');

        const blogs = response.body.map(r => r);
        // expect ids elements havve property id
        expect(blogs[0].id).toBeDefined();
    });
});


describe('sending post request', () => {

    test('Check that doing post increases the amount of blogs', async() => {
        const users = await User.find({}).exec();
        expect(users).toHaveLength(3);
        let user3LoginResponse = await api.post('/api/login').send({ username: 'jackdoe', password: 'jackD123' });
        user3LoginResponse = JSON.parse(user3LoginResponse.text);
        expect(user3LoginResponse).toHaveProperty('token');
        const newBlog = {
            title: 'Learning API testing',
            author: users[2].name,
            url: 'http://localhost:3003/api/blogs',
            likes: 30,
            userId: users[2].id
        };
        await api.post('/api/blogs').set('Authorization', 'bearer ' + user3LoginResponse.token).send(newBlog);
        const blogs = await api.get('/api/blogs');
        expect(blogs.body).toHaveLength(initialBlogs.length + 1);
    }, 10000);

    test('Check that doing post without the likes will default likes to 0', async() => {
        const users = await User.find({}).exec();
        const newBlog = {
            title: 'Learning API testing',
            author: users[2].name,
            url: 'http://localhost:3003/api/blogs',
            userId: users[2].id,
        };
        let user3LoginResponse = await api.post('/api/login').send({ username: 'jackdoe', password: 'jackD123' });
        user3LoginResponse = JSON.parse(user3LoginResponse.text);
        expect(user3LoginResponse).toHaveProperty('token');
        await api.post('/api/blogs').set('Authorization', 'bearer ' + user3LoginResponse.token).send(newBlog);
        const blogs = await api.get('/api/blogs');
        const response = blogs.body.map(blog => blog);
        expect(response[blogs.body.length - 1].likes).toBe(0);
    }, 10000);

    test('Check if title and url are missing from the post request the response has status code 400', async() => {
        const newBlog = {
            author: 'John Doe',
            likes: 10
        };
        try {
            let user1LoginResponse = await api.post('/api/login').send({ username: 'jdoe1', password: 'doe123' });
            user1LoginResponse = JSON.parse(user1LoginResponse.text);
            expect(user1LoginResponse).toHaveProperty('token');
            await api.post('/api/blogs').set('Authorization', 'bearer ' + user1LoginResponse.token).send(newBlog);
        } catch (error) {
            expect(error.response.status).toBe(400);
        }
    }, 10000);

    test('Check if a user does not have a valid token the response has status code 401', async() => {
        const users = await User.find({}).exec();
        const newBlog = {
            title: 'Learning API testing',
            author: users[2].name,
            url: 'http://localhost:3003/api/blogs',
            userId: users[2].id,
        };
        try {
            await api.post('/api/blogs').set('Authorization', 'bearer '+ '5a3d5e3').send(newBlog);
        } catch (e) {
            
            expect(e.response.status).toBe(401);
            expect(e.response.message).toBe('token missing or invalid');
        }

    }, 10000);

});

describe('delete request', () => {
    test('Check that deleting a blog decreases the amount of blogs', async() => {
        const initialBlogsFromDB = await api.get('/api/blogs');
        const ids = initialBlogsFromDB.body.map(b => b.id);
        await api.delete('/api/blogs/' + ids[0]);
        const blogs = await api.get('/api/blogs');
        expect(blogs.body).toHaveLength(initialBlogs.length - 1);
    });

    test('Check that deleting a blog with an invalid id returns status code 404', async() => {
        try {
            await api.delete('/api/blogs/' + '5a3d5e3');
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    });
});

describe('put request', () => {
    test('Check that updating a blog likes updates the original blogs likes', async() => {
        const initialBlogsFromDB = await api.get('/api/blogs');
        const ids = initialBlogsFromDB.body.map(b => b.id);
        const blogToUpdate = await api.get('/api/blogs/' + ids[0]);
        const updatedBlog = {
            ...blogToUpdate,
            likes: 1000
        };
        await api.put('/api/blogs/' + ids[0]).send(updatedBlog);
        const updatedBlogAfterPut = await api.get('/api/blogs/' + ids[0]);
        expect(updatedBlogAfterPut.body.likes).toBe(1000);
    });

    test('Check that updating a blog with an invalid id returns status code 404', async() => {
        try {
            await api.put('/api/blogs/' + '5a3d5e3');
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    });


});


afterAll(() => {
    mongoose.connection.close();
});