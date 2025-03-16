const mongoose = require("mongoose")
const { BorrowStatus } = require("../utils/constant")

const borrowTransactionSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		book: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Book",
			required: true,
		},
		borrowDate: {
			type: Date,
			default: Date.now,
		},
		dueDate: {
			type: Date,
			required: true,
		},
		returnDate: {
			type: Date,
		},
		status: {
			type: String,
			enum: Object.values(BorrowStatus),
			default: BorrowStatus.CHECKING,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

borrowTransactionSchema.index({ user: 1, status: 1 })
borrowTransactionSchema.index({ book: 1 })
borrowTransactionSchema.index({ dueDate: 1, status: 1 })

module.exports = mongoose.model("BorrowTransaction", borrowTransactionSchema)
