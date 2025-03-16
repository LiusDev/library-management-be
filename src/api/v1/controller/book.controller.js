/**
 * @type {import("../../../models/book.model")}
 */
const Book = require("../../../models/book.model")
/**
 * @type {import("../../../models/borrowTransaction.model")}
 */
const BorrowTransaction = require("../../../models/borrowTransaction.model")
const { BorrowStatus } = require("../../../utils/constant")

exports.getBooks = async (req, res) => {
	try {
		const {
			keyword,
			categories,
			order = "desc",
			sort = "createdAt",
			page = 1,
			limit = 10,
		} = req.query

		// Build query
		const query = {}

		// Search by keyword in title, description, and author
		if (keyword) {
			query.$or = [
				{ title: { $regex: keyword, $options: "i" } },
				{ description: { $regex: keyword, $options: "i" } },
				{ author: { $regex: keyword, $options: "i" } },
			]
		}

		// Filter by categories
		if (categories) {
			// Convert string to array if needed
			const categoryIds = Array.isArray(categories)
				? categories
				: categories.split(",")
			query.category = { $in: categoryIds }
		}

		// Set up sorting and order
		const sortOption = {}
		sortOption[sort] = order === "desc" ? -1 : 1

		// Calculate pagination
		const pageNum = parseInt(page)
		const limitNum = parseInt(limit)
		const skip = (pageNum - 1) * limitNum

		// Execute query with pagination
		const books = await Book.find(query)
			.sort(sortOption)
			.skip(skip)
			.limit(limitNum)
			.populate("category")

		// Get total count for pagination
		const totalBooks = await Book.countDocuments(query)

		res.status(200).json({
			data: books,
			total: totalBooks,
			page: pageNum,
			limit: limitNum,
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: error.message })
	}
}

exports.getBook = async (req, res) => {
	try {
		const { id } = req.params
		const book = await Book.findById(id).populate("category")

		if (!book) {
			return res.status(404).json({ message: "Book not found" })
		}

		res.status(200).json(book)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: error.message })
	}
}

exports.borrowBook = async (req, res) => {
	try {
		// Check if user is authenticated
		if (!req.user) {
			return res.status(401).json({ message: "Authentication required" })
		}

		const { bookId, time } = req.body
		const userId = req.user._id

		// Validate bookId
		if (!bookId) {
			return res.status(400).json({ message: "Book ID is required" })
		}

		// Find the book
		const book = await Book.findById(bookId)
		if (!book) {
			return res.status(404).json({ message: "Book not found" })
		}

		// Check time is number and positive from 1 to 4 (weeks)
		if (!time || isNaN(time) || time < 1 || time > 4) {
			return res.status(400).json({ message: "Invalid borrowing time" })
		}

		// Check if book is available
		if (book.available <= 0) {
			return res
				.status(400)
				.json({ message: "Book is not available for borrowing" })
		}

		// Calculate due date (14 days from now by default)
		const borrowDate = new Date()
		const dueDate = new Date()
		dueDate.setDate(dueDate.getDate() + time * 7)

		// Create new borrow transaction
		const borrowTransaction = new BorrowTransaction({
			user: userId,
			book: bookId,
			borrowDate: borrowDate,
			dueDate: dueDate,
			status: BorrowStatus.CHECKING, // Borrowed status
		})

		// Update book availability
		book.available -= 1

		// Save both documents in a transaction
		await Promise.all([borrowTransaction.save(), book.save()])

		res.status(201).json({
			message: "Book borrowed successfully",
			transaction: {
				id: borrowTransaction._id,
				borrowDate: borrowTransaction.borrowDate,
				dueDate: borrowTransaction.dueDate,
				status: borrowTransaction.status,
			},
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: error.message })
	}
}
