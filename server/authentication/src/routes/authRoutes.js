const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define the route for adding a new user
router.post('/add', authController.addUser);

// Define the route for getting a user by username
router.post('/get', authController.getUserByUsername);

// Define the route for deleting a user by id
router.delete('/:userId/delete', authController.deleteUserByID);

module.exports = router;
