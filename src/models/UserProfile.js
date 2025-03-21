/**
 * @swagger
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The user's unique ID
 *         name:
 *           type: string
 *           description: The user's full name
 *         email:
 *           type: string
 *           description: The user's email address
 *         avatar:
 *           type: string
 *           description: URL to the user's profile image
 *         googleId:
 *           type: string
 *           description: Google ID for OAuth authentication
 *         phone:
 *           type: string
 *           description: The user's phone number
 *         role:
 *           type: string
 *           enum: [admin, user, staff]
 *           description: The user's role
 *         isActive:
 *           type: boolean
 *           description: Whether the user account is active
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Account creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Account last update timestamp
 *       example:
 *         _id: 60d21b4667d0d8992e610c75
 *         name: John Doe
 *         email: john.doe@example.com
 *         avatar: https://example.com/avatar.jpg
 *         googleId: 12345678909876543210
 *         phone: "+1234567890"
 *         role: user
 *         isActive: true
 *         createdAt: 2023-01-01T12:00:00Z
 *         updatedAt: 2023-01-01T12:00:00Z
 */

// This file is only for Swagger documentation
// No actual model code here
