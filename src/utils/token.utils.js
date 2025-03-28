const jwt = require("jsonwebtoken")
const config = require("../config/config")

const generateToken = (user) => {
	return jwt.sign(
		{
			email: user.email,
		},
		config.jwt.secret,
		{
			expiresIn: config.jwt.expiresIn,
		}
	)
}

const verifyToken = (token) => {
	return jwt.verify(token, config.jwt.secret)
}

module.exports = {
	generateToken,
	verifyToken,
}
