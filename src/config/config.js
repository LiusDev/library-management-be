const config = {
	db: {
		url:
			process.env.MONGODB_URL ||
			"mongodb://localhost:27017/library-management",
	},
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
		adminUrl: process.env.ADMIN_URL || "http://localhost:5173",
	},
	cookie: {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
		domain:
			process.env.NODE_ENV === "production" ? ".quydx.id.vn" : undefined,
		path: "/",
		maxAge: 24 * 60 * 60 * 1000, // 24 hours
	},
}

module.exports = config
