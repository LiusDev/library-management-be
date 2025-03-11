/**
 * Middleware to check if user has required role
 * @param {Array} roles - Array of authorized roles
 * @returns {Function} Express middleware
 */
const authorize = (roles = []) => {
	// Convert string to array if only one role is passed
	if (typeof roles === "string") {
		roles = [roles]
	}

	return (req, res, next) => {
		// Check if user exists (should be set by authentication middleware)
		if (!req.user) {
			return res.status(401).json({ error: "Unauthorized" })
		}

		// If no roles are required or user's role is in the allowed roles
		if (roles.length === 0 || roles.includes(req.user.role)) {
			return next()
		}

		// If we get here, user doesn't have the required role
		return res.status(403).json({ error: "Forbidden" })
	}
}

module.exports = authorize
