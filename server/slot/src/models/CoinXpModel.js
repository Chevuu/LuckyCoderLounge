// models/userModel.js
const mongoose = require('mongoose');

const coinXPSchema = new mongoose.Schema({
  userID: { type: String, unique: true },
  coinCount: Number,
  xpCount: Number,
});

const CoinXPModel = mongoose.model('CoinXP', coinXPSchema);

module.exports = { CoinXPModel };
