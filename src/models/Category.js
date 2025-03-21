/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the category
 *         name:
 *           type: string
 *           description: Category name
 *         description:
 *           type: string
 *           description: Category description
 *           default: ""
 *       example:
 *         _id: 60d21b4667d0d8992e610c90
 *         name: Fiction
 *         description: Novels, short stories, and other fictional works
 *
 *     CategoryWithCount:
 *       allOf:
 *         - $ref: '#/components/schemas/Category'
 *         - type: object
 *           properties:
 *             bookCount:
 *               type: integer
 *               description: Number of books in this category
 *               default: 0
 *           example:
 *             _id: 60d21b4667d0d8992e610c90
 *             name: Fiction
 *             description: Novels, short stories, and other fictional works
 *             bookCount: 42
 */

// This file is only for Swagger documentation
// No actual model code here
