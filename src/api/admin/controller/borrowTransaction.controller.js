/**
 * @type {import("../../../models/borrowTransaction.model")}
 */
const BorrowTransaction = require("../../../models/borrowTransaction.model")
/**
 * @type {import("../../../models/user.model")}
 */
const User = require("../../../models/user.model")
/**
 * @type {import("../../../models/book.model")}
 */
const Book = require("../../../models/book.model")
const mongoose = require("mongoose")
const { BorrowStatus } = require("../../../utils/constant")

exports.getTransactions = async (req, res) => {
	try {
		const { page = 1, limit = 10, keyword = "", status } = req.query
		const pageNumber = parseInt(page)
		const limitNumber = parseInt(limit)

		// Build the filter object
		const filter = {}

		// Flag to track if we're looking for overdue items
		const isOverdueFilter = status === "overdue"

		if (status) {
			// Special handling for "overdue" filter
			if (isOverdueFilter) {
				// Find transactions that are:
				// 1. Currently borrowed (not returned)
				// 2. Past their due date
				filter.status = BorrowStatus.BORROWED
				filter.dueDate = { $lt: new Date() }
			} else {
				// Normal status filtering
				filter.status = status
			}
		}

		if (keyword) {
			// Find users with matching email
			const users = await User.find({
				email: { $regex: keyword, $options: "i" },
			})

			// Find books with matching title
			const books = await Book.find({
				title: { $regex: keyword, $options: "i" },
			})

			const userIds = users.map((user) => user._id)
			const bookIds = books.map((book) => book._id)

			// Search conditions
			const conditions = [
				{ user: { $in: userIds } },
				{ book: { $in: bookIds } },
			]

			// Try to include transaction ID in search if keyword might be a valid ObjectId
			if (keyword.match(/^[0-9a-fA-F]{24}$/)) {
				try {
					const objectId =
						new mongoose.Types.ObjectId.createFromHexString(keyword)
					conditions.push({ _id: objectId })
				} catch (error) {
					// Not a valid ObjectId, ignore this condition
				}
			}

			// Add keyword criteria to filter
			filter.$or = conditions
		}

		// Calculate skip value for pagination
		const skipAmount = (pageNumber - 1) * limitNumber

		// Get transactions
		const transactions = await BorrowTransaction.find(filter)
			.populate("user")
			.populate("book")
			.sort({ createdAt: -1 })
			.skip(skipAmount)
			.limit(limitNumber)

		// Process results to handle overdue status in response
		let processedTransactions = transactions

		// If we were filtering for overdue OR we need to check all results for overdue items
		if (isOverdueFilter || !status) {
			processedTransactions = transactions.map((doc) => {
				const transaction = doc.toObject()

				// Check if transaction is overdue (borrowed and past due date)
				if (
					transaction.status === BorrowStatus.BORROWED &&
					new Date(transaction.dueDate) < new Date() &&
					!transaction.returnDate
				) {
					// Mark as overdue in the response
					transaction.status = "overdue"
				}

				return transaction
			})
		}

		// Get total count
		const totalCount = await BorrowTransaction.countDocuments(filter)

		return res.status(200).json({
			data: processedTransactions,
			total: totalCount,
			page: pageNumber,
			limit: limitNumber,
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: error.message })
	}
}

exports.updateTransaction = async (req, res) => {
	try {
		const { id } = req.params
		const { status, returnDate, dueDate } = req.body

		// Find the transaction
		const transaction = await BorrowTransaction.findById(id)

		if (!transaction) {
			return res.status(404).json({ message: "Transaction not found" })
		}

		// Only allow updating status, return date, and due date
		const updateData = {}

		if (status) {
			// Check if status is being changed to RETURNED and wasn't already returned
			if (
				status === BorrowStatus.RETURNED &&
				transaction.status !== BorrowStatus.RETURNED
			) {
				// Increment the book's available count
				const book = await Book.findById(transaction.book)
				if (book) {
					book.available += 1
					await book.save()
				}
			}
			updateData.status = status
		}

		if (returnDate) {
			updateData.returnDate = returnDate
		}

		if (dueDate) {
			updateData.dueDate = dueDate
		}

		// Update the transaction
		const updatedTransaction = await BorrowTransaction.findByIdAndUpdate(
			id,
			updateData,
			{ new: true }
		)
			.populate("user")
			.populate("book")

		return res.status(200).json(updatedTransaction)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: error.message })
	}
}
