/**
 * @swagger
 * components:
 *   schemas:
 *     BorrowTransaction:
 *       type: object
 *       required:
 *         - user
 *         - book
 *         - dueDate
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the transaction
 *         user:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *             email:
 *               type: string
 *           description: User information
 *         book:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             title:
 *               type: string
 *             author:
 *               type: string
 *             description:
 *               type: string
 *             cover:
 *               type: string
 *             category:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *           description: Book information
 *         borrowDate:
 *           type: string
 *           format: date-time
 *           description: Date when the borrowing starts
 *           default: Current date and time
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: Date when the book is due to be returned
 *         returnDate:
 *           type: string
 *           format: date-time
 *           description: Actual date when the book was returned
 *         status:
 *           type: string
 *           enum: [checking, borrowed, returned]
 *           description: Status of the borrow transaction
 *           default: checking
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the transaction was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the transaction was last updated
 *       example:
 *         _id: "60d21b4667d0d8992e610c95"
 *         user:
 *           _id: "60d21b4667d0d8992e610c75"
 *           name: "John Doe"
 *           email: "john.doe@example.com"
 *         book:
 *           _id: "60d21b4667d0d8992e610c85"
 *           title: "The Great Gatsby"
 *           author: "F. Scott Fitzgerald"
 *           description: "A novel about the American Dream and its corruption in the 1920s."
 *           cover: "great-gatsby.jpg"
 *           category: [
 *             {
 *               _id: "60d21b4667d0d8992e610c90",
 *               name: "Fiction"
 *             }
 *           ]
 *         borrowDate: "2023-06-01T00:00:00.000Z"
 *         dueDate: "2023-06-15T00:00:00.000Z"
 *         status: "checking"
 *         createdAt: "2023-05-28T00:00:00.000Z"
 *         updatedAt: "2023-05-29T00:00:00.000Z"
 */

// This file is only for Swagger documentation
// No actual model code here
