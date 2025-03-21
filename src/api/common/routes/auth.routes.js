const express = require("express")
const passport = require("passport")
const config = require("../../../config/config")
const authController = require("../controller/auth.controller")
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication and user profile management
 */

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Authenticate with Google
 *     description: Redirects to Google authentication page
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirects to Google login
 */
router.get(
	"/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
		session: false,
	})
)

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google authentication callback
 *     description: Callback URL for Google OAuth authentication
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         description: Authorization code from Google
 *     responses:
 *       302:
 *         description: Redirects to frontend with auth token
 *       401:
 *         description: Authentication failed
 */
router.get(
	"/google/callback",
	passport.authenticate("google", {
		failureRedirect: `${config.frontend.url}/login?error=true`,
		session: false,
	}),
	authController.googleCallback
)

/**
 * @swagger
 * /auth/google/mobile:
 *   get:
 *     summary: Authenticate with Google (Mobile)
 *     description: Redirects to Google authentication page for mobile clients
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirects to Google login
 */
router.get(
	"/google/mobile",
	passport.authenticate("google-mobile", {
		scope: ["profile", "email"],
		session: false,
	})
)

/**
 * @swagger
 * /auth/google/mobile/callback:
 *   get:
 *     summary: Google authentication callback for mobile
 *     description: Callback URL for Google OAuth authentication from mobile apps
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         description: Authorization code from Google
 *     responses:
 *       302:
 *         description: Redirects to frontend with auth token
 *       401:
 *         description: Authentication failed
 */
router.get(
	"/google/mobile/callback",
	passport.authenticate("google-mobile", {
		failureRedirect: `${config.frontend.url}/login?error=true`,
		session: false,
	}),
	authController.googleCallbackMobile
)

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieves the profile of the currently authenticated user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       401:
 *         description: Unauthorized
 */
router.get("/profile", authController.getProfile)

/**
 * @swagger
 * /auth/phone:
 *   post:
 *     summary: Add phone number
 *     description: Add or update user's phone number
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *             properties:
 *               phone:
 *                 type: string
 *                 description: User's phone number
 *                 example: '+1234567890'
 *     responses:
 *       200:
 *         description: Phone number added successfully
 *       400:
 *         description: Invalid phone number format
 *       401:
 *         description: Unauthorized
 */
router.post("/phone", authController.addPhone)

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout user
 *     description: Logs out the current user and invalidates their session
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       401:
 *         description: Unauthorized
 */
router.get("/logout", authController.logout)

module.exports = router
