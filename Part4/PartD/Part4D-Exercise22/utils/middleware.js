const jwt = require('jsonwebtoken');
const logger = require('./loggers');
const config = require('./config');
const User = require('../models/user');

const tokenExtractor = (req, res, next) => {
  // code that extracts the token
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  } else {
    req.token = null;
  }

  next();
};

const userExtractor = async (req, res, next) => {
  if (req.token) {
    try {
      const decodedToken = jwt.verify(req.token, config.SECRET);
      const user = await User.findById(decodedToken.id);
      if (!user) {
        return res.status(401).json({ error: 'user not found' });
      }
      req.user = user;
    } catch (error) {
      next(error);
    }
  }
  next();
};

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' });
  }
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
