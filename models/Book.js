// models/Book.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  summary: { type: String, required: true }
});

module.exports = mongoose.model('Book', BookSchema);
