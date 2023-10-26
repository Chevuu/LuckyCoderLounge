const mongoose = require('mongoose');
require('dotenv').config();

const dbURL = `mongodb+srv://vukjurisic:${process.env.MONGODB_PASSWORD}@luckycoderdb.lowhwqo.mongodb.net/?retryWrites=true&w=majority`;

// Connect to the MongoDB database
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

// Handle potential errors when the connection is not successful
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});