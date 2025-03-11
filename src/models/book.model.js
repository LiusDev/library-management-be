const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		author: {
			type: String,
			required: true,
		},
		publishedDate: {
			type: Date,
			default: Date.now,
		},
		quantity: {
			type: Number,
			default: 0,
		},
		category: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Category",
				required: true,
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

module.exports = mongoose.model("Book", bookSchema)
