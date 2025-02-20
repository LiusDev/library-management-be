const config = {
	google: {
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: `${
			process.env.BASE_URL || "http://localhost:9999"
		}/auth/google/callback`,
	},
	jwt: {
		secret: process.env.JWT_SECRET || "your-jwt-secret",
		expiresIn: "24h",
	},
	frontend: {
		url: process.env.FRONTEND_URL || "http://localhost:5173",
	},
	cookie: {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 24 * 60 * 60 * 1000, // 24 hours
	},
}

module.exports = config
