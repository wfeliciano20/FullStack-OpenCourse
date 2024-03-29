const express = require('express');
const Blog = require('../models/blog');
const blogsRouter = express.Router();

blogsRouter.get('/', async(req, res, next) => {
    try {
        const response = await Blog.find({}).exec();
        res.json(response);
    } catch (error) {
        next(error);
    }
});

blogsRouter.get('/:id', async(req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id).exec();
        res.json(blog);
    } catch (error) {
        next(error);
    }
});

blogsRouter.post('/', async(req, res, next) => {
    const {title,author,url,likes} =req.body;
    const blog = new Blog({
        title,
        author,
        url,
        likes: likes||0
    });
    try {
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        next(error);
    }
});

blogsRouter.put('/:id', async(req, res, next) => {
    try {
        const response = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
        res.json(response);
    } catch (error) {
        next(error);
    }
});

blogsRouter.delete('/:id', async(req, res, next) => {
    try {
        await Blog.findByIdAndDelete(req.params.id).exec();
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

module.exports = blogsRouter;