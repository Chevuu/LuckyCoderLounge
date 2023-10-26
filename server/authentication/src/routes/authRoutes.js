const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define the route for adding a new user
router.post('/add', authController.addUser);

module.exports = router;
