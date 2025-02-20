const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		role: {
			type: String,
			enum: ["admin", "staff", "user"],
			default: "user",
		},
		avatar: {
			type: String,
			default: "",
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model("User", userSchema)
