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
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
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
 *                 total:
 *                   type: integer
 *                   description: Total number of transactions
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                 limit:
 *                   type: integer
 *                   description: Number of items per page
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Authentication required"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get("/", authorization([]), borrowTransactionController.getTransactions)

module.exports = router
