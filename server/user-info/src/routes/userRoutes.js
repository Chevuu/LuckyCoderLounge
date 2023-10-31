const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const dbConroller = require('../controllers/dbController');

// Define the route for adding a new user
router.post('/add', userController.addUser);

// Define the route for getting a user by ID
router.get('/:userId', userController.getUserById);

// Define the route for editing user fields
router.patch('/:userId/edit', userController.editUser);

// Define the route for deleting a user by userID
router.delete('/:userId/delete', userController.deleteUser);

router.delete('/all', dbConroller.clearDb);

module.exports = router;