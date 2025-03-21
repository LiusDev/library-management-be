require("dotenv").config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const connectDB = require("./config/database")
const passport = require("./config/passport")
const cookieParser = require("cookie-parser")
const { extractUser } = require("./middleware/auth.middleware")
const { createUploadsDir } = require("./config/init")
const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./config/swagger")

// Create necessary directories
createUploadsDir()

const authRoutes = require("./api/common/routes/auth.routes")
// admin routes
const adminUserRoutes = require("./api/admin/routes/user.routes")
const adminCategoryRoutes = require("./api/admin/routes/category.routes")
const adminBookRoutes = require("./api/admin/routes/book.routes")
const adminBorrowTransactionRoutes = require("./api/admin/routes/borrowTransaction.routes")

// user routes
const bookRoutes = require("./api/v1/routes/book.routes")
const categoryRoutes = require("./api/v1/routes/category.routes")
const borrowTransactionRoutes = require("./api/v1/routes/borrowTransaction.routes")

const app = express()
const port = process.env.PORT || 9999
const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost"

// CORS origin configuration
const corsOptions = {
	credentials: true,
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
	origin: function (origin, callback) {
		// Allow requests with no origin (like mobile apps or curl requests)
		if (!origin) return callback(null, true)

		if (process.env.NODE_ENV === "production") {
			// In production, only allow *.quydx.id.vn domains
			const allowedDomains = /^https:\/\/(.+\.)?quydx\.id\.vn$/
			if (allowedDomains.test(origin)) {
				return callback(null, true)
			}
		} else {
			// In development, allow all localhost origins
			if (
				origin.startsWith("http://localhost:") ||
				origin.startsWith("https://localhost:")
			) {
				return callback(null, true)
			}
		}

		callback(new Error("Not allowed by CORS"))
	},
}

// Apply CORS middleware
app.use(cors(corsOptions))

// Add security headers
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Credentials", "true")

	// Set Access-Control-Allow-Origin dynamically
	const origin = req.headers.origin
	if (origin) {
		if (process.env.NODE_ENV === "production") {
			// In production, check if origin is from quydx.id.vn
			if (/^https:\/\/(.+\.)?quydx\.id\.vn$/.test(origin)) {
				res.header("Access-Control-Allow-Origin", origin)
			}
		} else {
			// In development, allow localhost origins
			if (
				origin.startsWith("http://localhost:") ||
				origin.startsWith("https://localhost:")
			) {
				res.header("Access-Control-Allow-Origin", origin)
			}
		}
	}
	next()
})

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(extractUser)

// Initialize passport before routes
app.use(passport.initialize())

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.get("/swagger.json", (req, res) => {
	res.setHeader("Content-Type", "application/json")
	res.send(swaggerSpec)
})

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
v1Router.use("/category", categoryRoutes)
v1Router.use("/borrow", borrowTransactionRoutes)

// admin routes
adminRouter.use("/users", adminUserRoutes)
adminRouter.use("/category", adminCategoryRoutes)
adminRouter.use("/books", adminBookRoutes)
adminRouter.use("/borrow", adminBorrowTransactionRoutes)

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
		console.log(
			`Swagger documentation available at http://${host}:${port}/api-docs`
		)
	})
})

module.exports = app
