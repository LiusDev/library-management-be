const axios = require("axios")

const categories = [
	"Fiction",
	"Non-Fiction",
	"Mystery & Thriller",
	"Science Fiction",
	"Fantasy",
	"Romance",
	"History",
	"Biography",
	"Travel",
	"Self-Help",
	"Philosophy",
	"Art & Design",
	"Children's Books",
	"Young Adult Fiction",
	"Cooking",
]

categories.forEach((category) => {
	axios.post(
		"http://localhost:9999/admin/category",
		{ name: category },
		{
			headers: {
				Cookie: "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjcwOGQ3M2Q5YTE2ZjZiNWNlMTNkZCIsImVtYWlsIjoicXV5ZHgud29ya0BnbWFpbC5jb20iLCJpYXQiOjE3NDE2ODg0OTcsImV4cCI6MTc0MTc3NDg5N30.6fk1rYg8nJ6sGYsMwqY3vsOSTJLHMC2vvPppdqhuZJg",
			},
		}
	)
})
