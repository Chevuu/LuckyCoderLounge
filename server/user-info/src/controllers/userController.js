const { UserModel, CoinXPModel } = require('../models/userModel');

// Controller function for adding a new user
// Controller function for adding a new user
async function addUser(req, res) {
  try {
    // Find the maximum existing userID and increment it by one
    const latestUser = await UserModel.findOne().sort({ userID: -1 });

    const newUserID = latestUser ? latestUser.userID + 1 : 1;

    // Create a new user based on the request data
    const newUser = new UserModel({
      userID: newUserID,
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      nationality: req.body.nationality,
      language: req.body.language,
    });

    // Create a corresponding entry in the coinXP table
    const newCoinXP = new CoinXPModel({
      userID: newUserID,
      coinCount: 500,
      xpCount: 0,
    });

    // Save both the new user and the corresponding coinXP entry to the database
    await newUser.save();
    await newCoinXP.save();

    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function getUserById(req, res) {
  const userId = req.params.userId;

  try {
    const user = await UserModel.findOne({ userID: userId });

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Controller function for editing user fields
async function editUser(req, res) {
  const userId = req.params.userId;
  const updatedFields = req.body; // The updated fields in the request body

  try {
    const user = await UserModel.findOne({ userID: userId });

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Update the user fields based on the request body
    Object.keys(updatedFields).forEach((field) => {
      user[field] = updatedFields[field];
    });

    // Save the updated user
    await user.save();

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Controller function for deleting a user by userID
async function deleteUser(req, res) {
  const userId = req.params.userId;

  try {
    const deletedUser = await UserModel.findOneAndDelete({ userID: userId });

    if (!deletedUser) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.status(204).send(); // No content response for successful deletion
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send(error);
  }
}

module.exports = {
  addUser,
  getUserById,
  editUser,
  deleteUser,
};