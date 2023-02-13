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
			}
			if (args.author) {
				let foundAuthor = await Author.findOne({ name: args.author });
				return await Book.find({ author: foundAuthor._id }).populate('author');
			}
			if (args.genre) {
				return await Book.find({ genres: { $in: [args.genre] } }).populate(
					'author'
				);
			}
			return await Book.find({}).populate('author');
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
			const foundAuthor = await Author.findOne({ name: args.author });
			if (!foundAuthor) {
				let newAuthor = await new Author({ name: args.author }).save();
				const newBookWithNewAuthor = new Book({ ...args, author: newAuthor });
				await newBookWithNewAuthor.save();
				return newBookWithNewAuthor;
			}
			const newBook = new Book({ ...args, author: foundAuthor });
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
