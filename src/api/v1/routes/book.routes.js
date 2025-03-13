const express = require("express")
const router = express.Router()
const authorization = require("../../../middleware/authorization")
const bookController = require("../controller/book.controller")

router.get("/", authorization([]), bookController.getBooks)
router.get("/:id", authorization([]), bookController.getBook)

module.exports = router
