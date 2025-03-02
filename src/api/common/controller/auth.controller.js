const config = require("../../../config/config")
const { generateToken, verifyToken } = require("../../../utils/token.utils")
/**
 * @type {import("../../../models/user.model")}
 * */
const User = require("../../../models/user.model")

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
				role:
					req.user.email === process.env.ADMIN_EMAIL
						? "admin"
						: "user",
			})

			user = await newUser.save()
		} else {
			user.firstName = req.user.givenName || user.firstName
			user.lastName = req.user.familyName || user.lastName
			user.avatar = req.user.avatar || user.avatar
			user.save()
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

exports.getProfile = async (req, res) => {
	try {
		// Get access_token from cookie
		const token = req.cookies.access_token
		if (!token) {
			return res.status(401).json({ message: "Unauthorized" })
		}
		// Verify token
		const tokenUserInfo = verifyToken(token)
		if (!tokenUserInfo) {
			return res.status(401).json({ message: "Unauthorized" })
		}
		const user = await User.findOne({ email: tokenUserInfo.email }).select(
			"-password"
		)
		if (!user) {
			return res.status(404).json({ message: "User not found" })
		}
		res.json(user)
	} catch (error) {
		console.error("Error in getProfile:", error)
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
