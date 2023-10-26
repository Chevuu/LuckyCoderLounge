const { UserModel } = require('../models/userModel');

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

    // Save the new user to the database
    await newUser.save();

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

module.exports = {
  addUser,
  getUserById,
};
