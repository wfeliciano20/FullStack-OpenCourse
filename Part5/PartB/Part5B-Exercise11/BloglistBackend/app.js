const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const loginRouter = require('./controllers/login');
const logoutRouter = require('./controllers/logout');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const refreshRouter = require('./controllers/refreshToken');
const middleware = require('./utils/middleware');
const logger = require('./utils/loggers');

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

app.use(middleware.credentials);
app.use(middleware.tokenExtractor);
// app.use(cors());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.static('build'));
app.use(express.json());
app.use(cookieParser());
app.use(middleware.requestLogger);
app.use('/api/users', usersRouter);
app.use('/api/blogs', middleware.userExtractor, blogsRouter);
app.use('/api/refresh', refreshRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
