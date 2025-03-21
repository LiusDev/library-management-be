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
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search term for book title, description, or author
 *       - in: query
 *         name: categories
 *         schema:
 *           type: string
 *         description: Comma-separated list of category IDs to filter by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order (ascending or descending)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: createdAt
 *         description: Field to sort by (e.g., createdAt, title)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
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
 *                 total:
 *                   type: integer
 *                   description: Total number of books matching the query
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                 limit:
 *                   type: integer
 *                   description: Number of items per page
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
 *               - time
 *             properties:
 *               bookId:
 *                 type: string
 *                 description: ID of the book to borrow
 *               time:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 4
 *                 description: Number of weeks to borrow the book (1-4)
 *           example:
 *             bookId: "60d21b4667d0d8992e610c85"
 *             time: 2
 *     responses:
 *       201:
 *         description: Borrow request created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book borrowed successfully"
 *                 transaction:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     borrowDate:
 *                       type: string
 *                       format: date-time
 *                     dueDate:
 *                       type: string
 *                       format: date-time
 *                     status:
 *                       type: string
 *       400:
 *         description: Invalid request data or book not available
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book is not available for borrowing"
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
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book not found"
 */
router.post("/borrow", authorization([]), bookController.borrowBook)

module.exports = router
