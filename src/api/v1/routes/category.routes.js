const express = require("express")
const router = express.Router()
const categoryController = require("../controller/category.controller")
const authorization = require("../../../middleware/authorization")

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Book category management
 */

/**
 * @swagger
 * /v1/category:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve a list of all book categories with book count
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *         description: A list of categories with book count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CategoryWithCount'
 *                 total:
 *                   type: integer
 *                   description: Total number of categories
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get("/", authorization([]), categoryController.getCategories)

// router.get(
// 	"/:id",
// 	authorization([UserRole.ADMIN, UserRole.STAFF]),
// 	categoryController.getCategory
// )

module.exports = router
