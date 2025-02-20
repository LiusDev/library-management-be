const express = require("express")
const passport = require("passport")
const config = require("../config/config")
const { generateToken } = require("../utils/token.utils")
const router = express.Router()

router.get(
	"/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
		session: false,
	})
)

router.get(
	"/google/callback",
	passport.authenticate("google", {
		failureRedirect: `${config.frontend.url}/login?error=true`,
		session: false,
	}),
	(req, res) => {
		if (!req.user) {
			return res.status(401).json({ message: "Authentication failed" })
		}

		const token = generateToken(req.user)

		// Set token in HTTP-only cookie
		res.cookie("access_token", token, {
			httpOnly: config.cookie.httpOnly,
			secure: config.cookie.secure,
			sameSite: config.cookie.sameSite,
			maxAge: config.cookie.maxAge,
		})

		// Redirect to frontend
		res.redirect(`${config.frontend.url}`)
	}
)

router.get("/logout", (req, res) => {
	res.clearCookie("access_token")
	res.json({ message: "Logged out successfully" })
})

module.exports = router
