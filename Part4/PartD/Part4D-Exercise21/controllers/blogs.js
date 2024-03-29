const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
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
  const { title, author, url, likes, userId } = req.body;
  const { token } = req;
  // checlk if token is valid

  const decodedToken = jwt.verify(token, config.SECRET, (err, decodedToken) => {
    if (!token || err) {
      return false;
    }
    return decodedToken;
  });

  if (!token || !decodedToken) {
    res.status(401).json({ error: 'token missing or invalid' });
  } else if (title && author && url && userId) {
    //const user = await User.findById(userId).exec();
    const user = await User.findById(decodedToken.id).exec();
    if (!user) {
      res.status(400).json({ error: 'user not found' });
    }
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
      res.status(201).json(blog);
    } catch (error) {
      next(error);
    }
  } else {
    res
      .status(400)
      .json({ error: 'title, author, url and userId are required' });
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
  const { token } = req;
  let blog;
  try {
    blog = await Blog.findById(req.params.id).exec();
    const decodedToken = jwt.verify(
      token,
      config.SECRET,
      (err, decodedToken) => {
        if (!token || err) {
          return false;
        }
        return decodedToken;
      },
    );
    if (!token || !decodedToken) {
      res.status(401).json({ error: 'token missing or invalid' }).end();
    }

    if (blog.user.toString().id !== decodedToken.id) {
      res.status(401).json({ error: 'user not authorized' }).end();
    }
  } catch (error) {
    res.status(404).json({ error: 'blog not found' }).end();
  }

  try {
    await Blog.findByIdAndDelete(req.params.id).exec();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
