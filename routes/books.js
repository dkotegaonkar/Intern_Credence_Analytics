// routes/books.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a book by ID
router.get('/:id', getBook, (req, res) => {
  res.json(res.book);
});

// CREATE a book
router.post('/', async (req, res) => {
  const book = new Book({
    name: req.body.name,
    img: req.body.img,
    summary: req.body.summary
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a book
router.patch('/:id', getBook, async (req, res) => {
  if (req.body.name != null) {
    res.book.name = req.body.name;
  }
  if (req.body.img != null) {
    res.book.img = req.body.img;
  }
  if (req.body.summary != null) {
    res.book.summary = req.body.summary;
  }
  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a book
router.delete('/:id', getBook, async (req, res) => {
  try {
    await res.book.remove();
    res.json({ message: 'Deleted Book' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getBook(req, res, next) {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: 'Cannot find book' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.book = book;
  next();
}

module.exports = router;
