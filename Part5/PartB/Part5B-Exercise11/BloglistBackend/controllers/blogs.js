const express = require('express');
const Blog = require('../models/blog');
const User = require('../models/user');
const blogsRouter = express.Router();

blogsRouter.get('/', async (req, res, next) => {
	try {
		const response = await Blog.find({})
			.populate('user', { username: 1, name: 1 })
			.exec();
		res.json(response);
	} catch (error) {
		next(error);
	}
});

blogsRouter.get('/:id', async (req, res, next) => {
	try {
		const blog = await Blog.findById(req.params.id).exec();
		res.json(blog);
	} catch (error) {
		next(error);
	}
});

blogsRouter.post('/', async (req, res, next) => {
	const { title, author, url, likes } = req.body;
	const { token, user } = req;

	if (!token || !user) {
		res.status(401).json({ error: 'token missing or invalid' }).end();
	}

	if (title && author && url) {
		//const user = await User.findById(userId).exec();
		const blog = new Blog({
			title,
			author,
			url,
			likes: likes || 0,
			user: user._id,
		});
		try {
			user.blogs = user.blogs.concat(blog._id);
			await user.save();
			await blog.save();
			res.status(201).json(blog).end();
		} catch (error) {
			next(error);
		}
	} else {
		res
			.status(400)
			.json({ error: 'title, author, url and userId are required' })
			.end();
	}
});

blogsRouter.put('/:id', async (req, res, next) => {
	try {
		const response = await Blog.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		}).exec();
		res.json(response);
	} catch (error) {
		next(error);
	}
});

blogsRouter.delete('/:id', async (req, res, next) => {
	const { token, user, params } = req;
	try {
		const blog = await Blog.findById(params.id)
			.populate('user', { username: 1, name: 1, id: 1 })
			.exec();
		if (!token || !user) {
			return res.status(401).json({ error: 'token missing or invalid' });
		}
		// check that the user.id  is not equal to blog.user.id
		if (blog.user.id !== user.id) {
			return res.status(401).json({ error: 'user not authorized' }).send().end();
		}
		try {
			await Blog.findByIdAndDelete(params.id).exec();
			const userWhoDeleted = await User.findById(user.id).exec();
			userWhoDeleted.blogs = userWhoDeleted.blogs.filter(
				(blog) => blog.toString() !== params.id,
			);
			await userWhoDeleted.save();
			res.status(204).end();
		} catch (error) {
			next(error);
		}
	} catch (error) {
		res.status(404).json({ error: 'blog not found' }).end();
		return;
	}
});

module.exports = blogsRouter;
