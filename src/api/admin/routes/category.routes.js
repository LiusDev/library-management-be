const express = require("express")
const router = express.Router()
const categoryController = require("../controller/category.controller")
const authorization = require("../../../middleware/authorization")
const { UserRole } = require("../../../utils/constant")

router.post(
	"/",
	authorization([UserRole.ADMIN, UserRole.STAFF]),
	categoryController.createCategory
)

router.get(
	"/",
	authorization([UserRole.ADMIN, UserRole.STAFF]),
	categoryController.getCategories
)

router.get(
	"/:id",
	authorization([UserRole.ADMIN, UserRole.STAFF]),
	categoryController.getCategory
)

router.put(
	"/:id",
	authorization([UserRole.ADMIN, UserRole.STAFF]),
	categoryController.updateCategory
)

router.delete(
	"/:id",
	authorization([UserRole.ADMIN, UserRole.STAFF]),
	categoryController.deleteCategory
)

module.exports = router
