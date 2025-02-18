require("dotenv").config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const connectDB = require("./config/database")
const userRoutes = require("./routes/user.routes")

const app = express()
const port = process.env.PORT || 9999
const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost"

// Middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Basic route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to Library Management System API" })
})

// Routes
app.use("/v1/users", userRoutes)

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
