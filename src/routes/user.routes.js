const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.controller")
const validate = require("../middleware/validate")
const {
	createUserSchema,
	updateUserSchema,
} = require("../validations/user.validation")

router.get("/", userController.getUsers)
router.get("/:id", userController.getUserById)
router.post("/", validate(createUserSchema), userController.createUser)
router.put("/:id", validate(updateUserSchema), userController.updateUser)
router.delete("/:id", userController.deleteUser)

module.exports = router
