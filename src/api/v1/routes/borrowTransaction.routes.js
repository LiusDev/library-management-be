const express = require("express")
const router = express.Router()
const authorization = require("../../../middleware/authorization")
const borrowTransactionController = require("../controller/borrowTransaction.controller")

router.get("/", authorization([]), borrowTransactionController.getTransactions)

module.exports = router
