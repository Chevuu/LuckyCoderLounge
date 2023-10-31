const { UserLoginModel } = require("../models/userLoginModel");

// Controller function for adding a new user
async function addUser(req, res) {
  try {
    const newUser = new UserLoginModel({
      userID: req.body.userID,
      username: req.body.username,
      password: req.body.password,
    });

    await newUser.save();
    res.status(201).send({ newUser });
  } catch (error) {
    console.error("An error occurred in addUser:", error);
    res.status(400).send(error);
  }
}

// Controller function to get a user by their username
async function getUserByUsername(req, res) {
  try {
    const username = req.body.username; // Assuming the username is part of the URL parameters

    // Find the user based on the provided username
    const user = await UserLoginModel.findOne({ username });

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.status(200).send(user);
  } catch (error) {
    console.error("An error occurred in getUserByUsername:", error);
    res.status(500).send(error);
  }
}

// Controller function to delete a user by ID
async function deleteUserByID(req, res) {
  const userId = req.params.userId;

  try {
    const deletedUser = await UserLoginModel.findOneAndDelete({ userID: userId });

    if (!deletedUser) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send(error);
  }
}

module.exports = {
  addUser,
  getUserByUsername,
  deleteUserByID,
};
