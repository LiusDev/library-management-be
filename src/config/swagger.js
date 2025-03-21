const swaggerJsdoc = require("swagger-jsdoc")

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library Management System API",
			version: "1.0.0",
			description: "API documentation for Library Management System",
			contact: {
				name: "API Support",
				email: "support@example.com",
			},
		},
		servers: [
			{
				url:
					process.env.NODE_ENV === "production"
						? "https://library-api.quydx.id.vn"
						: `http://localhost:${process.env.PORT || 9999}`,
				description:
					process.env.NODE_ENV === "production"
						? "Production server"
						: "Local development server",
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
	},
	apis: [
		"./src/api/common/routes/*.js",
		"./src/api/v1/routes/*.js",
		"./src/api/admin/routes/*.js",
		"./src/models/*.js", // Include models for schema definitions
	],
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = swaggerSpec
