const { z } = require("zod")

const createUserSchema = z.object({
	body: z.object({
		username: z.string().min(3).max(30),
		email: z.string().email(),
		password: z.string().min(6),
		role: z.enum(["admin", "user"]).optional(),
	}),
})

const updateUserSchema = z.object({
	body: z.object({
		username: z.string().min(3).max(30).optional(),
		email: z.string().email().optional(),
		password: z.string().min(6).optional(),
		role: z.enum(["admin", "user"]).optional(),
	}),
	params: z.object({
		id: z.string(),
	}),
})

module.exports = {
	createUserSchema,
	updateUserSchema,
}
