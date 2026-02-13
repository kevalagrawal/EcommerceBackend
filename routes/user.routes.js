const express = require('express');
const { signup, login, getProfile } = require('../controllers/user.controller');
const { validateSignup, validateLogin, handleValidationErrors } = require('../middleware/validate.middleware');
const { authMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.post('/signup', validateSignup, handleValidationErrors, signup);
router.post('/login', validateLogin, handleValidationErrors, login);

// Protected routes
router.get('/profile', authMiddleware, getProfile);
router.get('/getusers')

module.exports = router;