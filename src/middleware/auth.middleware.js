const { verifyToken } = require("../utils/token.utils")
const User = require("../models/user.model")

/**
 * Middleware to extract user from access token and attach to request
 * If token is invalid or missing, req.user remains undefined but request continues
 */
const extractUser = async (req, res, next) => {
	try {
		// Get access_token from cookie
		const token = req.cookies.access_token
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
