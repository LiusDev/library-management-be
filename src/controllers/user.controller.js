const User = require("../models/user.model")

// Get all users
exports.getUsers = async (req, res) => {
	try {
		const users = await User.find().select("-password")
		res.json(users)
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

// Create user
exports.createUser = async (req, res) => {
	try {
		const user = new User(req.body)
		const newUser = await user.save()
		res.status(201).json(newUser)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

// Update user
exports.updateUser = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		}).select("-password")
		if (!user) {
			return res.status(404).json({ message: "User not found" })
		}
		res.json(user)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

// Delete user
exports.deleteUser = async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id)
		if (!user) {
			return res.status(404).json({ message: "User not found" })
		}
		res.json({ message: "User deleted successfully" })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
