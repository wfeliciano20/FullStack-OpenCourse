/* eslint-disable no-undef */
require('dotenv').config();

const PORT = process.env.PORT;

const MONGO_URI =
	process.env.NODE_ENV === 'test'
		? process.env.MONGO_URI_TEST
		: process.env.MONGO_URI;

const SECRET = process.env.SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
	MONGO_URI,
	PORT,
	SECRET,
	REFRESH_SECRET,
	NODE_ENV,
};
