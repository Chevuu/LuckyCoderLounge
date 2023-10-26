// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userID: { type: Number, unique: true, required: true },
  name: String,
  surname: String,
  email: String,
  phoneNumber: String,
  nationality: String,
  language: String,
});

// Pre-save middleware to generate the next userID
userSchema.pre('save', async function (next) {
  if (!this.userID) {
    const highestUserID = await this.constructor.findOne().sort({ userID: -1 });
    this.userID = highestUserID ? highestUserID.userID + 1 : 1;
  }
  next();
});

const coinXPSchema = new mongoose.Schema({
  userID: { type: String, unique: true },
  coinCount: Number,
  xpCount: Number,
});

const UserModel = mongoose.model('User', userSchema);
const CoinXPModel = mongoose.model('CoinXP', coinXPSchema);

module.exports = { UserModel, CoinXPModel };
