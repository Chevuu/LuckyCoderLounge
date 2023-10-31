const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID: { type: Number, unique: true, required: true },
    username: String,
    password: String,
  });

const UserLoginModel = mongoose.model('User-Login', userSchema);

module.exports = { UserLoginModel };