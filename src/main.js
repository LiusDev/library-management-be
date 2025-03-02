require("dotenv").config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const connectDB = require("./config/database")
const passport = require("./config/passport")
const authRoutes = require("./api/common/routes/auth.routes")
const userRoutes = require("./api/admin/routes/user.routes")
const bookRoutes = require("./api/v1/routes/book.routes")
const cookieParser = require("cookie-parser")

const app = express()
const port = process.env.PORT || 9999
const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost"

// Middleware
app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
)

// Add security headers
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Credentials", "true")
	res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL)
	next()
})

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Initialize passport before routes
app.use(passport.initialize())

// Basic route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to Library Management System API" })
})

const v1Router = express.Router()
const adminRouter = express.Router()

// common routes
app.use("/auth", authRoutes)

// v1 routes
v1Router.use("/books", bookRoutes)

// admin routes
adminRouter.use("/users", userRoutes)

app.use("/v1", v1Router)
app.use("/admin", adminRouter)

// 404 handler - Add this before error handling middleware
app.use((req, res) => {
	res.status(404).json({
		message: `Route ${req.method} ${req.url} not found`,
	})
})

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).json({ message: "Something went wrong!" })
})

// Connect to database before starting server
connectDB().then(() => {
	app.listen(port, host, () => {
		console.log(`Server is running on http://${host}:${port}`)
	})
})

module.exports = app
