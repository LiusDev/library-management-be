const express = require("express")
const router = express.Router()
const authorization = require("../../../middleware/authorization")
const borrowTransactionController = require("../controller/borrowTransaction.controller")

/**
 * @swagger
 * tags:
 *   name: Borrowing
 *   description: Book borrowing transaction management
 */

/**
 * @swagger
 * /v1/borrow:
 *   get:
 *     summary: Get user's borrow transactions
 *     description: Retrieve a list of borrow transactions for the authenticated user
 *     tags: [Borrowing]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected, returned, overdue]
 *         description: Filter by transaction status
 *     responses:
 *       200:
 *         description: A list of borrow transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/BorrowTransaction'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", authorization([]), borrowTransactionController.getTransactions)

module.exports = router
