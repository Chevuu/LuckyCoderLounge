const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define the route for adding a new user
router.post('/add', (req, res) => {
    userController.addUser(req, res);
    // After calling addUser, you can access the userID from the response and send it in the response.
    const userID = res.locals.userID; // Assuming the userID is available in res.locals
    res.status(201).send({ userID });
  });

// Define the route for getting a user by ID
router.get('/:userId', userController.getUserById);

// Define the route for editing user fields
router.patch('/:userId/edit', userController.editUser);

// Define the route for deleting a user by userID
router.delete('/:userId/delete', userController.deleteUser);

module.exports = router;