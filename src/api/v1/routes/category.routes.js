const express = require("express")
const router = express.Router()
const categoryController = require("../controller/category.controller")
const authorization = require("../../../middleware/authorization")

router.get("/", authorization([]), categoryController.getCategories)

// router.get(
// 	"/:id",
// 	authorization([UserRole.ADMIN, UserRole.STAFF]),
// 	categoryController.getCategory
// )

module.exports = router
