/**
 * @type {import("../../../models/book.model")}
 */
const Book = require("../../../models/book.model")
const cloudinary = require("../../../config/cloudinary")
const fs = require("fs")

exports.createBook = async (req, res) => {
	try {
		// Create book data from form fields
		const bookData = {
			title: req.body.title,
			description: req.body.description,
			author: req.body.author,
			publishedDate: req.body.publishedDate,
			quantity: req.body.quantity,
			available: req.body.available,
		}

		// Handle category data - could be a string, array, or JSON string
		if (req.body.category) {
			let categoryData = req.body.category

			// If it's a JSON string (from form data), parse it
			if (
				typeof categoryData === "string" &&
				(categoryData.startsWith("[") || categoryData.startsWith("{"))
			) {
				try {
					categoryData = JSON.parse(categoryData)
				} catch (e) {
					console.error("Error parsing category JSON:", e)
				}
			}

			// Ensure category is an array
			bookData.category = Array.isArray(categoryData)
				? categoryData
				: [categoryData]
		}

		// Handle file upload to Cloudinary if present
		if (req.file) {
			try {
				const result = await cloudinary.uploader.upload(req.file.path, {
					folder: "library",
					use_filename: true,
				})

				// Set the cover URL from Cloudinary
				bookData.cover = result.secure_url

				// Clean up temp file
				fs.unlinkSync(req.file.path)
			} catch (uploadError) {
				console.error("Cloudinary upload error:", uploadError)
				return res
					.status(400)
					.json({ message: "Error uploading image" })
			}
		}

		const book = new Book(bookData)
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

exports.updateBook = async (req, res) => {
	try {
		const { id } = req.params

		// Create update data from form fields
		const updateData = {
			title: req.body.title,
			description: req.body.description,
			author: req.body.author,
			publishedDate: req.body.publishedDate,
			quantity: req.body.quantity,
			available: req.body.available,
		}

		// Only include defined fields
		Object.keys(updateData).forEach(
			(key) => updateData[key] === undefined && delete updateData[key]
		)

		// Handle category data
		if (req.body.category) {
			let categoryData = req.body.category

			// If it's a JSON string (from form data), parse it
			if (
				typeof categoryData === "string" &&
				(categoryData.startsWith("[") || categoryData.startsWith("{"))
			) {
				try {
					categoryData = JSON.parse(categoryData)
				} catch (e) {
					console.error("Error parsing category JSON:", e)
				}
			}

			// Ensure category is an array
			updateData.category = Array.isArray(categoryData)
				? categoryData
				: [categoryData]
		}

		// Handle file upload to Cloudinary if present
		if (req.file) {
			try {
				const result = await cloudinary.uploader.upload(req.file.path, {
					folder: "library",
					use_filename: true,
				})

				// Set the cover URL from Cloudinary
				updateData.cover = result.secure_url

				// Clean up temp file
				fs.unlinkSync(req.file.path)
			} catch (uploadError) {
				console.error("Cloudinary upload error:", uploadError)
				return res
					.status(400)
					.json({ message: "Error uploading image" })
			}
		}

		// Find and update with validation and return updated document
		const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
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
