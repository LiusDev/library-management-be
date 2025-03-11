/**
 * @type {import("../../../models/category.model")}
 */
const Category = require("../../../models/category.model")

exports.createCategory = async (req, res) => {
	try {
		const category = new Category(req.body)
		const newCategory = await category.save()
		res.status(201).json(newCategory)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get all categories
exports.getCategories = async (req, res) => {
	try {
		const { page, limit } = req.query
		const validPage = parseInt(page, 10) || 1
		const validLimit = parseInt(limit, 10) || 10

		const categories = await Category.find({})
			.skip((validPage - 1) * validLimit)
			.limit(validLimit)

		const totalCategories = await Category.countDocuments({})

		res.json({
			data: categories,
			total: totalCategories,
			page: validPage,
			limit: validLimit,
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: error.message })
	}
}

exports.getCategory = async (req, res) => {
	try {
		const category = await Category.findById(req.params.id)
		if (!category) {
			return res.status(404).json({ message: "Category not found" })
		}
		return res.json(category)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

exports.updateCategory = async (req, res) => {
	try {
		const category = await Category.findByIdAndUpdate(
			req.params.id,
			req.body
		)
		if (!category) {
			return res.status(404).json({ message: "Category not found" })
		}
		res.json(category)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

exports.deleteCategory = async (req, res) => {
	try {
		const category = await Category.findByIdAndDelete(req.params.id)
		if (!category) {
			return res.status(404).json({ message: "Category not found" })
		}
		res.json(category)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
