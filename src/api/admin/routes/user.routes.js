const express = require("express")
const router = express.Router()
const userController = require("../controller/user.controller")
const authorization = require("../../../middleware/authorization")
const { UserRole } = require("../../../utils/constant")

router.get("/", authorization([UserRole.ADMIN]), userController.getUsers)
router.get("/:id", authorization([UserRole.ADMIN]), userController.getUserById)
router.put("/:id", authorization([UserRole.ADMIN]), userController.updateUser)

module.exports = router
