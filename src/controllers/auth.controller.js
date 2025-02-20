const config = require("../config/config")
const { generateToken } = require("../utils/token.utils")
/**
 * @type {import("../models/user.model")}
 * */
const User = require("../models/user.model")

exports.googleCallback = async (req, res) => {
	if (!req.user) {
		return res.status(401).json({ message: "Authentication failed" })
	}
	try {
		let user = await User.findOne({ email: req.user.email })
		if (!user) {
			const newUser = new User({
				username: req.user.username || req.user.email,
				email: req.user.email,
				firstName: req.user.givenName,
				lastName: req.user.familyName,
				avatar: req.user.avatar,
			})

			user = await newUser.save()
		}
		const token = generateToken(user)
		// Set token in HTTP-only cookie
		res.cookie("access_token", token, {
			...config.cookie,
			secure: true,
			sameSite: "none",
		})

		// Redirect to frontend
		res.redirect(`${config.frontend.url}`)
	} catch (error) {
		console.error("Error in Google Callback:", error)
		res.status(500).json({ message: "Internal server error" })
	}
}

exports.logout = (req, res) => {
	res.cookie("access_token", "", {
		...config.cookie,
		maxAge: 0,
	})
	res.json({ message: "Logged out successfully" })
}
