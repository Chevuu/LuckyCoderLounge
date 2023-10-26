const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID: Number,
    username: { type: String, unique: true },
    password: String,
  });

const UserLoginModel = mongoose.model('User-Login', userSchema);

module.exports = { UserLoginModel };