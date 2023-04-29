const Author = require('../models/Author');
const Book = require('../models/Book');
const User = require('../models/User');
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const { PubSub } = require('graphql-subscriptions');
const pubSub = new PubSub();

const resolvers = {
	Query: {
		bookCount: async () => await Book.collection.countDocuments(),
		authorCount: async () => await Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			if (args.author && args.genre) {
				let foundAuthor = await Author.findOne({ name: args.author });
				let booksOfAuthorWithGenres = await Book.find({
					$and: [
						{ author: { $in: [foundAuthor._id] } },
						{ genres: { $in: [args.genre] } },
					],
				}).populate('author');
				return booksOfAuthorWithGenres;
			} else if (args.author) {
				let foundAuthor = await Author.findOne({ name: args.author });
				return await Book.findById(foundAuthor._id).populate('author');
			} else if (args.genre) {
				return await Book.find({ genres: { $in: [args.genre] } }).populate(
					'author'
				);
			} else {
				return await Book.find({}).populate('author');
			}
		},
		allAuthors: async () => await Author.find({}),
		me: (root, args, context) => {
			return context.currentUser;
		},
	},

	Author: {
		bookCount: async (root) => {
			const foundAuthor = await Author.findOne({ name: root.name });
			const foundBooks = await Book.find({ author: foundAuthor._id });
			return foundBooks.length;
		},
	},

	Book: {
		author: async (root) => {
			console.log('root', root);
			let author = await Author.findOne({ name: root.author.name });
			return {
				name: author.name,
				born: author.born,
				bookCount: author.bookCount,
				id: author._id,
			};
		},
	},

	Mutation: {
		addBook: async (root, args, context) => {
			const currentUser = context.currentUser;

			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				});
			}

			let newAuthor;
			const foundAuthor = await Author.findOne({ name: args.author });
			if (!foundAuthor) {
				newAuthor = await new Author({ name: args.author }).save();
				const newBookNewAuthor = new Book({ ...args, author: newAuthor });
				try {
					await newBookNewAuthor.save();
					pubSub.publish('BOOK_ADDED', { bookAdded: newBookNewAuthor });
				} catch (error) {
					throw new GraphQLError(error.message, {
						extensions: {
							code: 'INVALID_ARGUMENT_ERROR',
						},
					});
				}

				return newBookNewAuthor;
			}
			const newBookFromFoundAuthor = new Book({ ...args, author: foundAuthor });
			try {
				await newBookFromFoundAuthor.save();
				pubSub.publish('BOOK_ADDED', { bookAdded: newBookFromFoundAuthor });
			} catch (error) {
				throw new GraphQLError(error.message, {
					extensions: {
						code: 'INVALID_ARGUMENT_ERROR',
					},
				});
			}

			return newBookFromFoundAuthor;
		},
		editAuthor: async (root, args, context) => {
			const currentUser = context.currentUser;

			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				});
			}
			const foundAuthor = await Author.findOne({ name: args.name });
			if (!foundAuthor) {
				return null;
			}
			foundAuthor.born = args.setBornTo;
			await foundAuthor.save();

			return foundAuthor;
		},
		createUser: async (root, args) => {
			const user = new User({
				username: args.username,
				favoriteGenre: args.favoriteGenre,
			});

			return await user.save().catch((error) => {
				throw new GraphQLError('Creating the user failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
						error,
					},
				});
			});
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });
			console.log('user', user);
			console.log('p', args.password);
			if (!user || args.password !== 'secret') {
				console.log('im in');
				throw new GraphQLError('wrong credentials', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				});
			}

			const userForToken = {
				username: user.username,
				favoriteGenre: user.favoriteGenre,
				id: user._id,
			};

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
		},
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubSub.asyncIterator(['BOOK_ADDED']),
		},
	},
};

module.exports = resolvers;
