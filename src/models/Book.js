/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - category
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the book
 *         title:
 *           type: string
 *           description: Book title
 *         description:
 *           type: string
 *           description: Book description
 *         author:
 *           type: string
 *           description: Book author
 *         publishedDate:
 *           type: string
 *           format: date-time
 *           description: Publication date
 *         quantity:
 *           type: integer
 *           description: Total number of copies owned by the library
 *           default: 0
 *         available:
 *           type: integer
 *           description: Number of available copies
 *           default: 0
 *         cover:
 *           type: string
 *           description: URL to the book cover image
 *           default: default.jpg
 *         category:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               name:
 *                 type: string
 *           description: Categories this book belongs to
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
 *         description: A novel about the American Dream and its corruption in the 1920s.
 *         publishedDate: 2023-01-01T00:00:00.000Z
 *         quantity: 10
 *         available: 8
 *         cover: great-gatsby.jpg
 *         category: [
 *           {
 *             _id: 60d21b4667d0d8992e610c90,
 *             name: Fiction
 *           },
 *           {
 *             _id: 60d21b4667d0d8992e610c91,
 *             name: Classics
 *           }
 *         ]
 *         createdAt: 2023-01-01T00:00:00.000Z
 *         updatedAt: 2023-01-10T00:00:00.000Z
 */

// This file is only for Swagger documentation
// No actual model code here
