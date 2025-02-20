const config = require("../config/config")
const { generateToken } = require("../utils/token.utils")

exports.googleCallback = (req, res) => {
	if (!req.user) {
		return res.status(401).json({ message: "Authentication failed" })
	}

	const token = generateToken(req.user)

	// Set token in HTTP-only cookie
	res.cookie("access_token", token, {
		...config.cookie,
		secure: true,
		sameSite: "none",
	})

	// Redirect to frontend
	res.redirect(`${config.frontend.url}`)
}

exports.logout = (req, res) => {
	res.cookie("access_token", "", {
		...config.cookie,
		maxAge: 0,
	})
	res.json({ message: "Logged out successfully" })
}
