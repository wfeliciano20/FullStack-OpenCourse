const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const api = supertest(app);

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

    const titles = response.body.map(r => r.title);
    expect(titles).toContain(
        'Learning Mern'
    );
});

test('check the blogs have an id', async () => {
    const response = await api.get('/api/Blogs');

    const blogs = response.body.map(r => r);
    // expect ids elements havve property id
    expect(blogs[0].id).toBeDefined();
});

test('Check that doing post increases the amount of blogs',async () => {
    const newBlog = {
        title: 'Learning API testing',
        author: 'Jake Doe',
        url: 'http://localhost:3003/api/blogs',
        likes:30
    };
    await api.post('/api/blogs').send(newBlog);
    const blogs = await api.get('/api/blogs');
    expect(blogs.body).toHaveLength(initialBlogs.length + 1);
});

afterAll(() => {
    mongoose.connection.close();
});