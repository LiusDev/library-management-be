/**
 * @type {import("../../../models/borrowTransaction.model")}
 */
const BorrowTransaction = require("../../../models/borrowTransaction.model")

exports.getTransactions = async (req, res) => {
	try {
		// Check if user is authenticated
		if (!req.user) {
			return res.status(401).json({ message: "Authentication required" })
		}

		const userId = req.user._id
		const { page = 1, limit = 10 } = req.query

		const pageNum = parseInt(page)
		const limitNum = parseInt(limit)
		const skip = (pageNum - 1) * limitNum

		// Execute query with pagination
		const transactions = await BorrowTransaction.find({ user: userId })
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limitNum)
			.populate("book")

		// Get total count for pagination
		const totalTransactions = await BorrowTransaction.countDocuments({
			user: userId,
		})

		res.status(200).json({
			data: transactions,
			total: totalTransactions,
			page: pageNum,
			limit: limitNum,
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: error.message })
	}
}
