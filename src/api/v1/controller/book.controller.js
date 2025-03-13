/**
 * @type {import("../../../models/book.model")}
 */
const Book = require("../../../models/book.model")

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
