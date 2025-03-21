/**
 * @swagger
 * components:
 *   schemas:
 *     BorrowTransaction:
 *       type: object
 *       required:
 *         - user
 *         - book
 *         - fromDate
 *         - toDate
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
 *             isbn:
 *               type: string
 *           description: Book information
 *         fromDate:
 *           type: string
 *           format: date
 *           description: Start date of borrowing period
 *         toDate:
 *           type: string
 *           format: date
 *           description: End date of borrowing period
 *         returnDate:
 *           type: string
 *           format: date
 *           description: Actual date when the book was returned
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected, returned, overdue]
 *           description: Status of the borrow transaction
 *         approvedBy:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *           description: Admin who approved the transaction
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the transaction was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the transaction was last updated
 *       example:
 *         _id: 60d21b4667d0d8992e610c95
 *         user:
 *           _id: 60d21b4667d0d8992e610c75
 *           name: John Doe
 *           email: john.doe@example.com
 *         book:
 *           _id: 60d21b4667d0d8992e610c85
 *           title: The Great Gatsby
 *           author: F. Scott Fitzgerald
 *           isbn: 978-3-16-148410-0
 *         fromDate: 2023-06-01
 *         toDate: 2023-06-15
 *         status: approved
 *         approvedBy:
 *           _id: 60d21b4667d0d8992e610c70
 *           name: Admin User
 *         createdAt: 2023-05-28T00:00:00.000Z
 *         updatedAt: 2023-05-29T00:00:00.000Z
 */

// This file is only for Swagger documentation
// No actual model code here
