const fs = require("fs")
const path = require("path")

// Create uploads directory if it doesn't exist
const createUploadsDir = () => {
	const uploadsDir = path.join(process.cwd(), "uploads")
	if (!fs.existsSync(uploadsDir)) {
		fs.mkdirSync(uploadsDir, { recursive: true })
		console.log("Uploads directory created")
	}
}

module.exports = {
	createUploadsDir,
}
