const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			default: "",
		},
	},
	{
		versionKey: false,
	}
)

module.exports = mongoose.model("Category", categorySchema)
