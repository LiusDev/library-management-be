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
 *     description: Retrieve a list of all book categories
 *     tags: [Categories]
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
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
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
router.get("/", authorization([]), categoryController.getCategories)

// router.get(
// 	"/:id",
// 	authorization([UserRole.ADMIN, UserRole.STAFF]),
// 	categoryController.getCategory
// )

module.exports = router
