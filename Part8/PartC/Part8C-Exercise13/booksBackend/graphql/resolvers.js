const Author = require('../models/Author');
const Book = require('../models/Book');

const resolvers = {
	Query: {
		bookCount: async () => await Book.collection.countDocuments(),
		authorCount: async () => await Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			if (args.author) {
				let foundAuthor = await Author.findOne({ name: args.author });
				let booksOfAuthor;
				if (foundAuthor) {
					booksOfAuthor = await Book.find({ author: foundAuthor.name });
				}

				if (booksOfAuthor) {
					if (args.genre) {
						return booksOfAuthor.filter((b) =>
							b.genres.find((g) => g === args.genre)
						);
					}
					return booksOfAuthor;
				}
			}
			if (args.genre) {
				return await Book.find({ genre: args.genre });
			}
			return await Book.find({});
		},
		allAuthors: async () => await Author.find({}),
	},

	Author: {
		bookCount: async (root) => {
			const books = await Book.find({});
			const authorsBooks = books.filter((book) => book.author === root.name);
			return authorsBooks.length;
		},
	},

	Mutation: {
		addBook: async (root, args) => {
			let newAuthor;
			const foundAuthor = await Author.findOne({ name: args.author });
			if (!foundAuthor) {
				newAuthor = await new Author({ name: args.author }).save();
			}
			const newBook = new Book({ ...args, author: newAuthor });
			await newBook.save();
			return newBook;
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
