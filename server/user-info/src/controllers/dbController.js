const { UserModel, CoinXPModel } = require('../models/userModel');

// Controller function for clearing both models
async function clearDb(req, res) {
  try {
    // Clear the UserModel
    await UserModel.deleteMany({});

    // Clear the CoinXPModel
    await CoinXPModel.deleteMany({});

    res.status(200).send('Both models cleared successfully.');
  } catch (error) {
    console.error('Error clearing models:', error);
    res.status(500).send('Error clearing models');
  }
}

module.exports = {
  clearDb
};
