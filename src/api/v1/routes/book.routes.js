const express = require("express")
const router = express.Router()
const authorization = require("../../../middleware/authorization")
const bookController = require("../controller/book.controller")

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management and operations
 */

/**
 * @swagger
 * /v1/books:
 *   get:
 *     summary: Get all books
 *     description: Retrieve a list of all books with optional filtering
 *     tags: [Books]
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
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter books by title, author, or ISBN
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Category ID to filter books
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
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
router.get("/", authorization([]), bookController.getBooks)

/**
 * @swagger
 * /v1/books/{id}:
 *   get:
 *     summary: Get book by ID
 *     description: Retrieve detailed information about a specific book by its ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Detailed book information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", authorization([]), bookController.getBook)

/**
 * @swagger
 * /v1/books/borrow:
 *   post:
 *     summary: Borrow a book
 *     description: Create a new borrow transaction request for a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *               - fromDate
 *               - toDate
 *             properties:
 *               bookId:
 *                 type: string
 *                 description: ID of the book to borrow
 *               fromDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of borrowing period
 *               toDate:
 *                 type: string
 *                 format: date
 *                 description: End date of borrowing period
 *     responses:
 *       201:
 *         description: Borrow request created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BorrowTransaction'
 *       400:
 *         description: Invalid request data or book not available
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Book not found
 */
router.post("/borrow", authorization([]), bookController.borrowBook)

module.exports = router
