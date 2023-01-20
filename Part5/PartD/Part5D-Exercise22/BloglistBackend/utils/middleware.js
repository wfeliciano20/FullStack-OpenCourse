const jwt = require('jsonwebtoken');
const logger = require('./loggers');
const config = require('./config');
const User = require('../models/user');

const credentials = (req, res, next) => {
	res.header('Access-Control-Allow-Credentials', true);
	next();
};

const tokenExtractor = (req, res, next) => {
	const authorization = req.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		req.token = authorization.substring(7);
	} else {
		req.token = null;
	}

	next();
};

const userExtractor = async (req, res, next) => {
	let decodedToken;
	if (req.token) {
		try {
			try {
				decodedToken = jwt.verify(req.token, config.SECRET);
			} catch (error) {
				return res.status(403).json({ error: `${error.message}` });
			}
			const user = await User.findById(decodedToken.id);
			if (!user) {
				return res.status(401).json({ error: 'unauthorized' });
			}
			req.user = user;
		} catch (error) {
			next(error);
		}
	}
	next();
};

const requestLogger = (req, res, next) => {
	logger.info('Method:', req.method);
	logger.info('Path:  ', req.path);
	logger.info('Body:  ', req.body);
	logger.info('---');
	next();
};

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message });
	} else if (error.name === 'JsonWebTokenError') {
		return res.status(401).json({
			error: 'invalid token',
		});
	} else if (error.name === 'TokenExpiredError') {
		return res.status(401).json({ error: 'token expired' });
	}
	next(error);
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor,
	credentials,
};
