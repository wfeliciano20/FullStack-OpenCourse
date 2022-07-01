const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const loginRouter = require('./controllers/login');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const middleware = require('./utils/middleware');
const logger = require('./utils/loggers');
const mongoose = require('mongoose');

logger.info('connecting to db...');

// eslint-disable-next-line no-undef
mongoose.connect(config.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (err) =>
	logger.error('error connecting to MongoDB:', err.message),
);
db.once('open', () => {
	logger.info('connected to MongoDB');
});
app.use(middleware.tokenExtractor);
app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/users', usersRouter);
app.use('/api/blogs', middleware.userExtractor, blogsRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
