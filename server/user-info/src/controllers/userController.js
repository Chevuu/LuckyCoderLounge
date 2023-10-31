const { UserModel, CoinXPModel } = require('../models/userModel');

// Controller function for adding a new user
async function addUser(req, res) {
  try {
    const latestUser = await UserModel.findOne().sort({ userID: -1 });

    const newUserID = latestUser ? latestUser.userID + 1 : 1;

    const newUser = new UserModel({
      userID: newUserID,
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      nationality: req.body.nationality,
      language: req.body.language,
    });

    const newCoinXP = new CoinXPModel({
      userID: newUserID,
      coinCount: 500,
      xpCount: 0,
    });

    await newUser.save();
    await newCoinXP.save();

    console.log("Created new user: " + newUser);

    res.status(201).json({ userID: newUserID });
  } catch (error) {
    console.error('An error occurred in addUser:', error);
    res.status(400).send(error);
  }
}

// Controller function for getting a user by Id
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
    const deletedUserCoinXP = await CoinXPModel.findOneAndDelete({ userID: userId });

    if (!deletedUser) {
      return res.status(404).send({ error: 'User not found' });
    }

    if (!deletedUserCoinXP) {
      return res.status(404).send({ error: 'UserCoinXP not found' });
    }

    res.status(204).send();
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