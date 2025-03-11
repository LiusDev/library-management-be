const express = require("express")
const router = express.Router()
const bookController = require("../controller/book.controller")
const authorization = require("../../../middleware/authorization")
const { UserRole } = require("../../../utils/constant")

router.post(
	"/",
	authorization([UserRole.ADMIN, UserRole.STAFF]),
	bookController.createBook
)

router.get(
	"/",
	authorization([UserRole.ADMIN, UserRole.STAFF]),
	bookController.getBooks
)

router.get(
	"/:id",
	authorization([UserRole.ADMIN, UserRole.STAFF]),
	bookController.getBook
)

router.put(
	"/:id",
	authorization([UserRole.ADMIN, UserRole.STAFF]),
	bookController.updateBook
)

router.delete(
	"/:id",
	authorization([UserRole.ADMIN, UserRole.STAFF]),
	bookController.deleteBook
)
module.exports = router
