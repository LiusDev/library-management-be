const User = require("../../../models/user.model")

// Get all users with pagination and email search
exports.getUsers = async (req, res) => {
	try {
		const { page = 1, limit = 10, keyword = "" } = req.query
		const skip = (parseInt(page) - 1) * parseInt(limit)

		// Create query with email search if keyword is provided
		const query = keyword
			? { email: { $regex: keyword, $options: "i" } }
			: {}

		const total = await User.countDocuments(query)
		const users = await User.find(query)
			.select("-password")
			.limit(parseInt(limit))
			.skip(skip)

		res.json({
			data: users,
			total,
			page: parseInt(page),
			limit: parseInt(limit),
		})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get single user
exports.getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id).select("-password")
		if (!user) {
			return res.status(404).json({ message: "User not found" })
		}
		res.json(user)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Update user role and status in one API
exports.updateUser = async (req, res) => {
	try {
		const { role, status } = req.body

		// Validate status is either 'active' or 'banned'
		if (status && !["active", "banned"].includes(status)) {
			return res
				.status(400)
				.json({ message: "Status must be either 'active' or 'banned'" })
		}

		// First get the user to check if it's the protected admin
		const user = await User.findById(req.params.id).select("-password")

		if (!user) {
			return res.status(404).json({ message: "User not found" })
		}

		// Check if this is the protected admin email
		const isProtectedAdmin = user.email === process.env.ADMIN_EMAIL

		// Create update object with only allowed fields
		const updateData = {}

		// Only allow role change if not the protected admin
		if (role && !isProtectedAdmin) {
			updateData.role = role
		} else if (role && isProtectedAdmin) {
			return res.status(403).json({
				message: "Cannot change role of the protected admin account",
			})
		}

		if (status) updateData.status = status

		// If there's nothing to update
		if (Object.keys(updateData).length === 0) {
			return res
				.status(400)
				.json({ message: "No valid fields to update" })
		}

		// Update user
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			updateData,
			{
				new: true,
			}
		).select("-password")

		res.json(updatedUser)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}
