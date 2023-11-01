const express = require('express');
const router = express.Router();
const slotController = require('../controllers/slotController');

// Define the route for adding a new slot
router.patch('/:userId/changeBalance', slotController.updateCoinsAndXPByUserId);

// Define the route for getting a slot by ID
router.get('/:userId', slotController.getCoinsAndXPByUserId);

module.exports = router;