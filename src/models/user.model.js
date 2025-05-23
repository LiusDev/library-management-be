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
		},
		role: {
			type: String,
			enum: Object.values(UserRole),
			default: UserRole.USER,
		},
		avatar: {
			type: String,
			default: "",
		},
		status: {
			type: String,
			enum: ["active", "banned"],
			default: "active",
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

module.exports = mongoose.model("User", userSchema)
