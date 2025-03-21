const { verifyToken } = require("../utils/token.utils")
const User = require("../models/user.model")

/**
 * Middleware to extract user from access token and attach to request
 * Supports both cookie-based auth (web) and Bearer token auth (mobile)
 * If token is invalid or missing, req.user remains undefined but request continues
 */
const extractUser = async (req, res, next) => {
	try {
		// Get token from cookie or Authorization header
		let token = req.cookies.access_token

		// Check Authorization header for Bearer token (mobile)
		const authHeader = req.headers.authorization
		if (!token && authHeader && authHeader.startsWith("Bearer ")) {
			token = authHeader.split(" ")[1]
		}

		if (!token) {
			return next()
		}

		// Verify token
		const tokenUserInfo = verifyToken(token)
		if (!tokenUserInfo) {
			return next()
		}

		// Find user in database
		const user = await User.findOne({ email: tokenUserInfo.email }).select(
			"-password"
		)
		if (user) {
			// Attach user to request object
			req.user = user
		}

		next()
	} catch (error) {
		console.error("Error extracting user from token:", error)
		next()
	}
}

module.exports = { extractUser }
