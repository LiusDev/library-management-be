const express = require("express")
const passport = require("passport")
const config = require("../../../config/config")
const authController = require("../controller/auth.controller")
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
	authController.googleCallback
)

router.get("/profile", authController.getProfile)

router.get("/logout", authController.logout)

module.exports = router
