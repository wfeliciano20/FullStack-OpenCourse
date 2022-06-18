const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

const initialBlogs = [
    {
        title: 'Learning Mern',
        author: 'John Doe',
        url: 'http://localhost:3003/api/blogs',
        likes:10
    },
    {
        title: 'Learning Express',
        author: 'Jane Doe',
        url: 'http://localhost:3003/api/blogs',
        likes:20
    }
];

beforeEach(async () => {
    await Blog.deleteMany({});
    let BlogObject = new Blog(initialBlogs[0]);
    await BlogObject.save();
    BlogObject = new Blog(initialBlogs[1]);
    await BlogObject.save();
});

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length);
});

test('the first Blog is about Learning Mern', async () => {
    const response = await api.get('/api/Blogs');

    const contents = response.body.map(r => r.title);
    expect(contents).toContain(
        'Learning Mern'
    );
});

afterAll(() => {
    mongoose.connection.close();
});