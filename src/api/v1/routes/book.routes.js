const express = require("express")
const router = express.Router()
const bookController = require("../controller/book.controller")
const validate = require("../../../middleware/validate")

router.get("/", bookController.getBooks)
router.get("/:id", bookController.getBookById)
router.post("/", bookController.createBook)

module.exports = router
