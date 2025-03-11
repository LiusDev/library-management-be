/**
 * @type {import("../../../models/book.model")}
 */
const Book = require("../../../models/book.model")

exports.createBook = async (req, res) => {
	try {
		// Validate if categories are provided as array
		if (req.body.category && !Array.isArray(req.body.category)) {
			req.body.category = [req.body.category] // Convert to array if single value
		}

		const book = new Book(req.body)
		const newBook = await book.save()

		// Populate category information before returning
		const populatedBook = await Book.findById(newBook._id).populate(
			"category"
		)

		res.status(201).json(populatedBook)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: error.message })
	}
}

exports.getBooks = async (req, res) => {
	try {
		const {
			keyword,
			categories,
			orderBy = "createdAt",
			sort = "desc",
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

		// Set up sorting
		const sortOrder = sort.toLowerCase() === "asc" ? 1 : -1
		const sortOption = {}
		sortOption[orderBy] = sortOrder

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

exports.updateBook = async (req, res) => {
	try {
		const { id } = req.params

		// Validate if categories are provided as array
		if (req.body.category && !Array.isArray(req.body.category)) {
			req.body.category = [req.body.category] // Convert to array if single value
		}

		// Find and update with validation and return updated document
		const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
			new: true, // Return updated doc
			runValidators: true, // Validate before update
		}).populate("category")

		if (!updatedBook) {
			return res.status(404).json({ message: "Book not found" })
		}

		res.status(200).json(updatedBook)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: error.message })
	}
}

exports.deleteBook = async (req, res) => {
	try {
		const { id } = req.params
		const deletedBook = await Book.findByIdAndDelete(id)

		if (!deletedBook) {
			return res.status(404).json({ message: "Book not found" })
		}

		res.status(200).json({ message: "Book deleted successfully", id })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: error.message })
	}
}
