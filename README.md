# Experiment 8: Node.js & Express RESTful API for Book Collection

## Overview
A lightweight RESTful service providing complete CRUD (Create, Read, Update, Delete) endpoints for book records.

## Project Structure
```
experiment-8/
├── package.json
├── server.js
├── public/
│   └── index.html      # Interactive Bootstrap test dashboard
└── README.md
```

## Running the Server

1. Navigate into the directory:
   ```bash
   cd experiment-8
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

4. Open your browser at:
   ```
   http://localhost:3000
   ```

## REST API Endpoints

| Method | Endpoint | Description | Sample Body |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/books` | Get all books (supports `?genre=...`) | N/A |
| **GET** | `/api/books/:id` | Get single book by ID | N/A |
| **POST** | `/api/books` | Add new book | `{"title":"...","author":"...","year":2024,"genre":"..."}` |
| **PUT** | `/api/books/:id` | Update book by ID | `{"title":"...","author":"...","year":2024,"genre":"..."}` |
| **DELETE** | `/api/books/:id` | Delete book by ID | N/A |
