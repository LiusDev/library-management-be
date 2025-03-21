/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - isbn
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the book
 *         title:
 *           type: string
 *           description: Book title
 *         author:
 *           type: string
 *           description: Book author
 *         isbn:
 *           type: string
 *           description: International Standard Book Number
 *         description:
 *           type: string
 *           description: Book description
 *         publishDate:
 *           type: string
 *           format: date
 *           description: Publication date
 *         category:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *           description: Category information
 *         coverImage:
 *           type: string
 *           description: URL to the book cover image
 *         availableCopies:
 *           type: integer
 *           description: Number of available copies
 *         totalCopies:
 *           type: integer
 *           description: Total number of copies owned by the library
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the book was added to the system
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the book information was last updated
 *       example:
 *         _id: 60d21b4667d0d8992e610c85
 *         title: The Great Gatsby
 *         author: F. Scott Fitzgerald
 *         isbn: 978-3-16-148410-0
 *         description: A novel about the American Dream and its corruption in the 1920s.
 *         publishDate: 1925-04-10
 *         category:
 *           _id: 60d21b4667d0d8992e610c90
 *           name: Fiction
 *         coverImage: https://example.com/covers/great-gatsby.jpg
 *         availableCopies: 5
 *         totalCopies: 10
 *         createdAt: 2023-01-01T00:00:00.000Z
 *         updatedAt: 2023-01-01T00:00:00.000Z
 */

// This file is only for Swagger documentation
// No actual model code here
