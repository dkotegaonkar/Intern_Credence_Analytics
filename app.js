// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const booksRouter = require('./routes/books');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
mongoose.connect(config.mongoURI);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// Root URL route handler
app.get('/', (req, res) => {
  res.send('Welcome to the Book API! Use /books to access the API.');
});

// Books routes
app.use('/books', booksRouter);

// Start the server
const PORT = process.env.PORT || 4200;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
