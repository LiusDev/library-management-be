/**
 * @type {import("../models/book.model")}
 */
const Book = require("../models/book.model")

exports.getBooks = async (req, res) => {
	try {
		// get keyword, page, pageSize searchParams from req
		const { keyword, page = 1, pageSize = 10 } = req.query

		const filter = {}
		if (keyword) {
			filter.$or = [
				{ title: { $regex: keyword, $options: "i" } },
				{ description: { $regex: keyword, $options: "i" } },
				{ author: { $regex: keyword, $options: "i" } },
			]
		}

		// Create both queries
		const documentQuery = Book.find(filter)
			.skip((page - 1) * pageSize)
			.limit(pageSize)

		const countQuery = Book.countDocuments(filter)

		// Execute both queries in parallel with Promise.all
		const [books, totalCount] = await Promise.all([
			documentQuery.exec(),
			countQuery.exec(),
		])
		res.json({
			books,
			total: totalCount,
			page: parseInt(page),
			pageSize: parseInt(pageSize),
		})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

exports.getBookById = async (req, res) => {
	try {
		const bookId = req.params.id
		const book = await Book.findById(bookId)
		if (!book) {
			return res.status(404).json({ message: "Book not found" })
		}
		res.json(book)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

exports.createBook = async (req, res) => {
	try {
		const newBook = new Book(req.body)
		await newBook.save()
		res.status(201).json(newBook)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}
