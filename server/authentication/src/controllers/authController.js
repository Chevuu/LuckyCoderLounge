const { UserLoginModel } = require('../models/userLoginModel');

const fetch = async () => {
  return await import('node-fetch');
}

// Controller function for adding a new user
async function addUser(req, res) {
  try {
    console.log('addUser called'); // Add a log to show that the function was called

    // Prepare the user data (excluding username and password) to send to another service
    const userDataForOtherService = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      nationality: req.body.nationality,
      language: req.body.language,
    };

    // Make a POST request to the other service's endpoint with the user data
    const response = await fetch('http://localhost:3000/api/users/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDataForOtherService),
    });

    if (response.ok) {
      console.log('API request to other service succeeded'); // Log a success message

      const data = await response.json();
      const { userID } = data; // Get the userID from the response

      // Create a new user in the authentication service
      const newUser = new UserLoginModel({
        userID: userID,
        username: req.body.username,
        password: req.body.password,
      });

      // Save the new user to the authentication database
      await newUser.save();

      console.log('User added to authentication database'); // Log a success message

      // Respond with the userID
      res.status(201).send({ userID });
    } else {
      console.log('API request to other service failed'); // Log an error message
      res.status(400).send('Failed to add user in the other service');
    }
  } catch (error) {
    console.error('An error occurred in addUser:', error); // Log the error
    res.status(400).send(error);
  }
}

module.exports = {
  addUser,
};
