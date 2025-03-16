const express = require("express")
const router = express.Router()
const authorization = require("../../../middleware/authorization")
const { UserRole } = require("../../../utils/constant")
const borrowController = require("../controller/borrowTransaction.controller")

// Get all transactions with pagination and search
router.get(
	"/",
	authorization([UserRole.ADMIN, UserRole.STAFF]),
	borrowController.getTransactions
)

// Update transaction status, return date, and due date
router.put(
	"/:id",
	authorization([UserRole.ADMIN, UserRole.STAFF]),
	borrowController.updateTransaction
)

module.exports = router
