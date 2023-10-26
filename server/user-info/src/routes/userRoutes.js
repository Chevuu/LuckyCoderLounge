const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define the route for adding a new user
router.post('/add', userController.addUser);

// Define the route for getting a user by ID
router.get('/:userId', userController.getUserById);

module.exports = router;
