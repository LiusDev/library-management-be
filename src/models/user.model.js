const mongoose = require("mongoose")
const { UserRole } = require("../utils/constant")

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
		phone: {
			type: String,
			trim: true,
			unique: true,
		},
		role: {
			type: String,
			enum: Object.entries(UserRole).map(([, value]) => value),
			default: "user",
		},
		avatar: {
			type: String,
			default: "",
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

module.exports = mongoose.model("User", userSchema)
