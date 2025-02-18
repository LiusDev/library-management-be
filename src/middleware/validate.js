const validate = (schema) => async (req, res, next) => {
	try {
		await schema.parseAsync({
			body: req.body,
			query: req.query,
			params: req.params,
		})
		next()
	} catch (error) {
		const messages = error.errors.map((err) => ({
			path: err.path.join("."),
			message: err.message,
		}))
		return res.status(400).json({ errors: messages })
	}
}

module.exports = validate
