// populate.js
const mongoose = require('mongoose');
const config = require('./config');
const Book = require('./models/Book');

mongoose.connect(config.mongoURI);
const db = mongoose.connection;

const books = [
  {
    name: "Harry Potter and the Order of the Phoenix",
    img: "https://bit.ly/2IcnSwz",
    summary: "Harry Potter and Dumbledore's warning about the return of Lord Voldemort is not heeded by the wizard authorities who, in turn, look to undermine Dumbledore's authority at Hogwarts and discredit Harry."
  },
  {
    name: "The Lord of the Rings: The Fellowship of the Ring",
    img: "https://bit.ly/2tC1Lcg",
    summary: "A young hobbit, Frodo, who has found the One Ring that belongs to the Dark Lord Sauron, begins his journey with eight companions to Mount Doom, the only place where it can be destroyed."
  },
  {
    name: "Avengers: Endgame",
    img: "https://bit.ly/2Pzczlb",
    summary: "Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America, and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe."
  }
];

db.once('open', async () => {
  try {
    await Book.deleteMany({});
    await Book.insertMany(books);
    console.log('Database populated');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
});
