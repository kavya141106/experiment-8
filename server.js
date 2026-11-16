/**
 * Experiment 8: RESTful API for Book Collection
 * Author: Kavya Agarwal
 * Technology: Node.js & Express.js
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// In-Memory Database for Book Collection
let books = [
    { id: 1, title: "Hands-On Machine Learning with Scikit-Learn and TensorFlow", author: "Aurélien Géron", year: 2019, genre: "Data Science" },
    { id: 2, title: "The C++ Programming Language", author: "Bjarne Stroustrup", year: 2013, genre: "Programming" },
    { id: 3, title: "Python for Data Analysis", author: "Wes McKinney", year: 2022, genre: "Data Analytics" }
];

let nextId = 4;

// 1. GET /api/books - Retrieve all books (with optional genre filtering)
app.get('/api/books', (req, res) => {
    const { genre } = req.query;
    if (genre) {
        const filtered = books.filter(b => b.genre.toLowerCase() === genre.toLowerCase());
        return res.json({ success: true, count: filtered.length, data: filtered });
    }
    res.json({ success: true, count: books.length, data: books });
});

// 2. GET /api/books/:id - Retrieve single book by ID
app.get('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);
    if (!book) {
        return res.status(404).json({ success: false, message: `Book with ID ${id} not found.` });
    }
    res.json({ success: true, data: book });
});

// 3. POST /api/books - Add a new book
app.post('/api/books', (req, res) => {
    const { title, author, year, genre } = req.body;

    if (!title || !author) {
        return res.status(400).json({ success: false, message: "Title and author are required fields." });
    }

    const newBook = {
        id: nextId++,
        title: title.trim(),
        author: author.trim(),
        year: year ? parseInt(year) : new Date().getFullYear(),
        genre: genre ? genre.trim() : "General"
    };

    books.push(newBook);
    res.status(201).json({ success: true, message: "Book added successfully.", data: newBook });
});

// 4. PUT /api/books/:id - Update an existing book completely
app.put('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({ success: false, message: `Book with ID ${id} not found.` });
    }

    const { title, author, year, genre } = req.body;
    books[bookIndex] = {
        id,
        title: title ? title.trim() : books[bookIndex].title,
        author: author ? author.trim() : books[bookIndex].author,
        year: year ? parseInt(year) : books[bookIndex].year,
        genre: genre ? genre.trim() : books[bookIndex].genre
    };

    res.json({ success: true, message: "Book updated successfully.", data: books[bookIndex] });
});

// 5. DELETE /api/books/:id - Remove a book from collection
app.delete('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({ success: false, message: `Book with ID ${id} not found.` });
    }

    const deleted = books.splice(bookIndex, 1);
    res.json({ success: true, message: "Book deleted successfully.", data: deleted[0] });
});

// Start Server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
        console.log(`Open http://localhost:${PORT} in your browser to view the interactive tester.`);
    });
}

module.exports = app;
