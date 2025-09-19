const express = require('express');
const {
  registerUser,
  loginUser,
  getUserProfile
} = require('../controllers/userControllers');

const router = express.Router();

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile/:email', getUserProfile); // Get user profile by email

module.exports = router;
