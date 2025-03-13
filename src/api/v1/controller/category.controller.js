/**
 * @type {import("../../../models/category.model")}
 */
const Category = require("../../../models/category.model")

/**
 * @type {import("../../../models/book.model")}
 */
const Book = require("../../../models/book.model")

exports.getCategories = async (req, res) => {
	try {
		const { page, limit } = req.query
		const validPage = parseInt(page, 10) || 1
		const validLimit = parseInt(limit, 10) || 10

		const bookCountsByCategory = await Book.aggregate([
			{ $unwind: "$category" },
			{ $group: { _id: "$category", count: { $sum: 1 } } },
		])

		const bookCountMap = {}
		bookCountsByCategory.forEach((item) => {
			bookCountMap[item._id.toString()] = item.count
		})

		const categories = await Category.find({})
			.skip((validPage - 1) * validLimit)
			.limit(validLimit)

		const totalCategories = await Category.countDocuments({})

		const categoriesWithCount = categories.map((category) => {
			const categoryObj = category.toObject()
			categoryObj.bookCount = bookCountMap[category._id.toString()] || 0
			return categoryObj
		})

		res.json({
			data: categoriesWithCount,
			total: totalCategories,
			page: validPage,
			limit: validLimit,
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: error.message })
	}
}
