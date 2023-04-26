const { ApolloServer, gql } = require('@apollo/server');
const { createServer } = require('http');
//const { v1: uuid } = require('uuid');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
//const { startStandaloneServer } = require('@apollo/server/standalone');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const { expressMiddleware } = require('@apollo/server/express4');
const {
	ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const { MONGODB_URL, PORT, JWT_SECRET } = require('./utils/config');
const logger = require('./utils/logger');
const express = require('express');
const { PubSub } = require('graphql-subscriptions');
const { makeExecutableSchema } = require('@graphql-tools/schema');
// const { SubscriptionServer } = require('subscriptions-transport-ws');
// const { execute, subscribe } = require('graphql');
//const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');

let authors = [
	{
		name: 'Robert Martin',
		id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
		born: 1952,
	},
	{
		name: 'Martin Fowler',
		id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
		born: 1963,
	},
	{
		name: 'Fyodor Dostoevsky',
		id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
		born: 1821,
	},
	{
		name: 'Joshua Kerievsky', // birthyear not known
		id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
	},
	{
		name: 'Sandi Metz', // birthyear not known
		id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
	},
];

let books = [
	{
		title: 'Clean Code',
		published: 2008,
		author: 'Robert Martin',
		id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring'],
	},
	{
		title: 'Agile software development',
		published: 2002,
		author: 'Robert Martin',
		id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
		genres: ['agile', 'patterns', 'design'],
	},
	{
		title: 'Refactoring, edition 2',
		published: 2018,
		author: 'Martin Fowler',
		id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring'],
	},
	{
		title: 'Refactoring to patterns',
		published: 2008,
		author: 'Joshua Kerievsky',
		id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring', 'patterns'],
	},
	{
		title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
		published: 2012,
		author: 'Sandi Metz',
		id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring', 'design'],
	},
	{
		title: 'Crime and punishment',
		published: 1866,
		author: 'Fyodor Dostoevsky',
		id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
		genres: ['classic', 'crime'],
	},
	{
		title: 'The Demon',
		published: 1872,
		author: 'Fyodor Dostoevsky',
		id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
		genres: ['classic', 'revolution'],
	},
];

//mongoose setup and connection
mongoose.set('strictQuery', false);

logger('Connecting to MongoDB...');

mongoose
	.connect(MONGODB_URL)
	.then(() => {
		console.log('Connected to MongoDB!');
	})
	.catch((err) => {
		console.log('Error connecting to MONGO_DB', err.message);
	});

// const server = new ApolloServer({
// 	typeDefs,
// 	resolvers,
// });

// startStandaloneServer(server, {
// 	listen: { port: PORT || 4000 },
// 	context: async ({ req, res }) => {
// 		const auth = req ? req.headers.authorization : null;
// 		if (auth && auth.startsWith('Bearer ')) {
// 			const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
// 			const currentUser = await User.findById(decodedToken.id);
// 			const pubSub = new PubSub();
// 			return { currentUser, pubSub };
// 		}
// 	},
// }).then(({ url }) => {
// 	logger(`Server ready at ${url}`);
// });

(async function () {
	const app = express();

	app.use(cors());

	const httpServer = createServer(app);

	const wsServer = new WebSocketServer({
		server: httpServer,
		path: '/',
	});

	const schema = makeExecutableSchema({ typeDefs, resolvers });
	const serverCleanup = useServer({ schema }, wsServer);

	const server = new ApolloServer({
		schema,
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			{
				async serverWillStart() {
					return {
						async drainServer() {
							await serverCleanup.dispose();
						},
					};
				},
			},
		],
	});

	await server.start();

	app.use(
		'/',
		cors(),
		express.json(),
		expressMiddleware(server, {
			context: async ({ req, res }) => {
				const auth = req ? req.headers.authorization : null;
				const pubSub = new PubSub();
				let currentUser = null;
				if (auth && auth.startsWith('Bearer ')) {
					const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
					currentUser = await User.findById(decodedToken.id);
				}
				return {
					currentUser,
					pubSub,
				};
			},
		})
	);

	const PORT = 4000;

	httpServer.listen(PORT, () =>
		console.log(`Server listening on http://localhost:${PORT}`)
	);
})();
