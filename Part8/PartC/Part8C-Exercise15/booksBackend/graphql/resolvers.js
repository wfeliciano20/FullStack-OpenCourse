const Author = require('../models/Author');
const Book = require('../models/Book');

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
		addBook: async (root, args) => {
			let newAuthor;
			const foundAuthor = await Author.findOne({ name: args.author });
			if (!foundAuthor) {
				newAuthor = await new Author({ name: args.author }).save();
				const newBookNewAuthor = new Book({ ...args, author: newAuthor });
				try {
					await newBookNewAuthor.save();
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
			} catch (error) {
				throw new GraphQLError(error.message, {
					extensions: {
						code: 'INVALID_ARGUMENT_ERROR',
					},
				});
			}

			return newBookFromFoundAuthor;
		},
		editAuthor: async (root, args) => {
			const foundAuthor = await Author.findOne({ name: args.name });
			if (!foundAuthor) {
				return null;
			}
			foundAuthor.born = args.setBornTo;
			await foundAuthor.save();

			return foundAuthor;
		},
	},
};

module.exports = resolvers;
