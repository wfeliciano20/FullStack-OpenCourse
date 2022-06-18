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

describe('there are 2 blogs initially',()=>{
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
});


describe('sending post request', () => {

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

    test('Check that doing post without the likes will default likes to 0',async () => {
        const newBlog = {
            title: 'Learning API testing',
            author: 'Jake Doe',
            url: 'http://localhost:3003/api/blogs',
        };
        await api.post('/api/blogs').send(newBlog);
        const blogs = await api.get('/api/blogs');
        const response = blogs.body.map(blog=>blog);
        expect(response[blogs.body.length - 1].likes).toBe(0);
    });

    test('Check if title and url are missing from the post request the response has status code 400',async () => {
        const newBlog = {
            author: 'John',
            likes: 10
        };
        try{
            await api.post('/api/blogs').send(newBlog);
        }catch(error){
            expect(error.response.status).toBe(400);
        }

    });

});

describe('delete request',()=>{
    test('Check that deleting a blog decreases the amount of blogs',async () => {
        const initialBlogsFromDB = await api.get('/api/blogs');
        const ids = initialBlogsFromDB.body.map(b => b.id);
        await api.delete('/api/blogs/' + ids[0]);
        const blogs = await api.get('/api/blogs');
        expect(blogs.body).toHaveLength(initialBlogs.length - 1);
    });

    test('Check that deleting a blog with an invalid id returns status code 404',async () => {
        try{
            await api.delete('/api/blogs/' + '5a3d5e3');
        }
        catch(error){
            expect(error.response.status).toBe(404);
        }
    });
});


afterAll(() => {
    mongoose.connection.close();
});