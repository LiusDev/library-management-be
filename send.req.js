const axios = require("axios")

// const categories = [
// 	"Fiction",
// 	"Non-Fiction",
// 	"Mystery & Thriller",
// 	"Science Fiction",
// 	"Fantasy",
// 	"Romance",
// 	"History",
// 	"Biography",
// 	"Travel",
// 	"Self-Help",
// 	"Philosophy",
// 	"Art & Design",
// 	"Children's Books",
// 	"Young Adult Fiction",
// 	"Cooking",
// ]

// Category IDs from database
const categoryIds = {
	Fiction: "67d02acb5d3346450d706b82",
	"Non-Fiction": "67d02acb5d3346450d706b84",
	"Mystery & Thriller": "67d02acb5d3346450d706b86",
	Romance: "67d02acb5d3346450d706b88",
	History: "67d02acb5d3346450d706b8a",
	Biography: "67d02acb5d3346450d706b8c",
	Travel: "67d02acb5d3346450d706b8e",
	"Self-Help": "67d02acb5d3346450d706b90",
	Philosophy: "67d02acb5d3346450d706b92",
	"Art & Design": "67d02acb5d3346450d706b94",
	"Children's Books": "67d02acb5d3346450d706b96",
	"Young Adult Fiction": "67d02acb5d3346450d706b98",
	Cooking: "67d02acb5d3346450d706b9a",
	"Science Fiction": "67d02acb5d3346450d706b9c",
}

// // Create categories
// categories.forEach((category) => {
// 	axios.post(
// 		"http://localhost:9999/admin/category",
// 		{ name: category },
// 		{
// 			headers: {
// 				Cookie: "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjcwOGQ3M2Q5YTE2ZjZiNWNlMTNkZCIsImVtYWlsIjoicXV5ZHgud29ya0BnbWFpbC5jb20iLCJpYXQiOjE3NDE2ODg0OTcsImV4cCI6MTc0MTc3NDg5N30.6fk1rYg8nJ6sGYsMwqY3vsOSTJLHMC2vvPppdqhuZJg",
// 			},
// 		}
// 	)
// })

// Mock book data
const books = [
	{
		title: "To Kill a Mockingbird",
		description:
			"A classic novel about racial injustice and moral growth in the American South during the 1930s.",
		author: "Harper Lee",
		publishedDate: "1960-07-11",
		quantity: 15,
		cover: "https://covers.openlibrary.org/b/id/8231432-L.jpg",
		category: [categoryIds["Fiction"]],
	},
	{
		title: "1984",
		description:
			"A dystopian social science fiction novel about a totalitarian regime and the rebellion against it.",
		author: "George Orwell",
		publishedDate: "1949-06-08",
		quantity: 12,
		cover: "https://covers.openlibrary.org/b/id/8575741-L.jpg",
		category: [categoryIds["Fiction"], categoryIds["Science Fiction"]],
	},
	{
		title: "Pride and Prejudice",
		description:
			"A romantic novel following the character of Elizabeth Bennet as she deals with issues of manners, upbringing, and marriage.",
		author: "Jane Austen",
		publishedDate: "1813-01-28",
		quantity: 10,
		cover: "https://covers.openlibrary.org/b/id/12053375-L.jpg",
		category: [categoryIds["Fiction"], categoryIds["Romance"]],
	},
	{
		title: "The Great Gatsby",
		description:
			"A novel that examines the decay of the American dream in an era of prosperity and material excess.",
		author: "F. Scott Fitzgerald",
		publishedDate: "1925-04-10",
		quantity: 8,
		cover: "https://covers.openlibrary.org/b/id/8463578-L.jpg",
		category: [categoryIds["Fiction"]],
	},
	{
		title: "Sapiens: A Brief History of Humankind",
		description:
			"A book that explores the history and impact of Homo sapiens on the world.",
		author: "Yuval Noah Harari",
		publishedDate: "2011-02-10",
		quantity: 20,
		cover: "https://covers.openlibrary.org/b/id/8474043-L.jpg",
		category: [categoryIds["Non-Fiction"], categoryIds["History"]],
	},
	{
		title: "The Silent Patient",
		description:
			"A psychological thriller about a woman who shoots her husband and then stops speaking.",
		author: "Alex Michaelides",
		publishedDate: "2019-02-05",
		quantity: 7,
		cover: "https://covers.openlibrary.org/b/id/10160066-L.jpg",
		category: [categoryIds["Mystery & Thriller"]],
	},
	{
		title: "Dune",
		description:
			"A science fiction novel set in the distant future amidst a feudal interstellar society.",
		author: "Frank Herbert",
		publishedDate: "1965-08-01",
		quantity: 14,
		cover: "https://covers.openlibrary.org/b/id/9450463-L.jpg",
		category: [categoryIds["Science Fiction"]],
	},
	{
		title: "The Alchemist",
		description:
			"A philosophical novel about a shepherd boy's journey to the pyramids of Egypt to find treasure.",
		author: "Paulo Coelho",
		publishedDate: "1988-01-01",
		quantity: 25,
		cover: "https://covers.openlibrary.org/b/id/7222973-L.jpg",
		category: [categoryIds["Fiction"], categoryIds["Philosophy"]],
	},
	{
		title: "Steve Jobs",
		description: "The biography of Apple co-founder Steve Jobs.",
		author: "Walter Isaacson",
		publishedDate: "2011-10-24",
		quantity: 18,
		cover: "https://covers.openlibrary.org/b/id/7327526-L.jpg",
		category: [categoryIds["Biography"], categoryIds["Non-Fiction"]],
	},
	{
		title: "The Hobbit",
		description:
			"A fantasy novel about the adventures of hobbit Bilbo Baggins.",
		author: "J.R.R. Tolkien",
		publishedDate: "1937-09-21",
		quantity: 22,
		cover: "https://covers.openlibrary.org/b/id/8323742-L.jpg",
		category: [categoryIds["Fiction"], categoryIds["Fantasy"]],
	},
	{
		title: "The 7 Habits of Highly Effective People",
		description:
			"A self-help book focused on personal development principles.",
		author: "Stephen R. Covey",
		publishedDate: "1989-08-15",
		quantity: 30,
		cover: "https://covers.openlibrary.org/b/id/8739161-L.jpg",
		category: [categoryIds["Self-Help"], categoryIds["Non-Fiction"]],
	},
	{
		title: "Harry Potter and the Philosopher's Stone",
		description:
			"The first novel in the Harry Potter series about a young wizard's journey at Hogwarts.",
		author: "J.K. Rowling",
		publishedDate: "1997-06-26",
		quantity: 35,
		cover: "https://covers.openlibrary.org/b/id/12009823-L.jpg",
		category: [categoryIds["Young Adult Fiction"], categoryIds["Fantasy"]],
	},
	{
		title: "In Cold Blood",
		description:
			"A non-fiction novel detailing the 1959 murders of a Kansas farm family.",
		author: "Truman Capote",
		publishedDate: "1966-01-17",
		quantity: 6,
		cover: "https://covers.openlibrary.org/b/id/272726-L.jpg",
		category: [
			categoryIds["Non-Fiction"],
			categoryIds["Mystery & Thriller"],
		],
	},
	{
		title: "The Road",
		description:
			"A post-apocalyptic novel following a father and son's journey through a devastated America.",
		author: "Cormac McCarthy",
		publishedDate: "2006-09-26",
		quantity: 11,
		cover: "https://covers.openlibrary.org/b/id/7089271-L.jpg",
		category: [categoryIds["Fiction"], categoryIds["Science Fiction"]],
	},
	{
		title: "Mastering the Art of French Cooking",
		description:
			"A classic cookbook that brought French cuisine to American home cooks.",
		author: "Julia Child",
		publishedDate: "1961-10-16",
		quantity: 9,
		cover: "https://covers.openlibrary.org/b/id/8126937-L.jpg",
		category: [categoryIds["Cooking"], categoryIds["Non-Fiction"]],
	},
	{
		title: "Where the Crawdads Sing",
		description:
			"A novel about an abandoned girl who raises herself in the marshes of North Carolina.",
		author: "Delia Owens",
		publishedDate: "2018-08-14",
		quantity: 17,
		cover: "https://covers.openlibrary.org/b/id/10270153-L.jpg",
		category: [categoryIds["Fiction"], categoryIds["Mystery & Thriller"]],
	},
	{
		title: "Thinking, Fast and Slow",
		description:
			"A book that explores the two systems that drive the way we think.",
		author: "Daniel Kahneman",
		publishedDate: "2011-10-25",
		quantity: 13,
		cover: "https://covers.openlibrary.org/b/id/7079267-L.jpg",
		category: [categoryIds["Non-Fiction"], categoryIds["Psychology"]],
	},
	{
		title: "The Elements of Style",
		description: "A guidebook on English language usage and composition.",
		author: "William Strunk Jr. and E.B. White",
		publishedDate: "1959-01-01",
		quantity: 20,
		cover: "https://covers.openlibrary.org/b/id/8267948-L.jpg",
		category: [categoryIds["Non-Fiction"]],
	},
	{
		title: "The Very Hungry Caterpillar",
		description:
			"A children's picture book about a caterpillar's week-long journey to becoming a butterfly.",
		author: "Eric Carle",
		publishedDate: "1969-06-03",
		quantity: 40,
		cover: "https://covers.openlibrary.org/b/id/7092514-L.jpg",
		category: [categoryIds["Children's Books"]],
	},
	{
		title: "The Da Vinci Code",
		description:
			"A mystery thriller novel that follows symbologist Robert Langdon as he investigates a murder in the Louvre.",
		author: "Dan Brown",
		publishedDate: "2003-04-01",
		quantity: 24,
		cover: "https://covers.openlibrary.org/b/id/8753735-L.jpg",
		category: [categoryIds["Fiction"], categoryIds["Mystery & Thriller"]],
	},
]

// Function to add delay between requests
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Add books with delay to prevent overwhelming server
async function addBooks() {
	const authHeaders = {
		headers: {
			Cookie: "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjcwOGQ3M2Q5YTE2ZjZiNWNlMTNkZCIsImVtYWlsIjoicXV5ZHgud29ya0BnbWFpbC5jb20iLCJpYXQiOjE3NDE2ODg0OTcsImV4cCI6MTc0MTc3NDg5N30.6fk1rYg8nJ6sGYsMwqY3vsOSTJLHMC2vvPppdqhuZJg",
		},
	}

	for (const book of books) {
		try {
			const response = await axios.post(
				"http://localhost:9999/admin/books",
				book,
				authHeaders
			)
			console.log(`Added book: ${book.title}`)
			await delay(500) // Wait 500ms between requests
		} catch (error) {
			console.log(error.message)

			console.error(`Error adding book ${book.title}:`, error.message)
		}
	}
}

// Execute book addition
addBooks()
