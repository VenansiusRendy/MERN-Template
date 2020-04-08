// Import Express
const express = require('express');
// Import Express Validator
const { check, validationResult } = require('express-validator');
// Import Bcrypt
const bcrypt = require('bcryptjs');
// Import Json Web Token (JWT)
const jwt = require('jsonwebtoken');
// Import Config to access json secret --> must be put in a config file
const config = require('config');
// To protect private route, bring middleware
const auth = require('../middleware/auth');
// Import User Model Schema
const User = require('../models/User');

// Create Route
const router = express.Router();
// Route Description
// @route   GET  api/auth
// @desc    Get logged in user
// @access  Private
// Pass auth as second parameter to verify token
router.get('/', auth, async (req, res) => {
  try {
    // Get user from database except password
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Route Description
// @route   POST  api/auth
// @desc    Auth user & get token
// @access  Public
router.post(
  '/',
  [
    // Validator
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    // Error Checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Destructure email and password from request.body
    const { email, password } = req.body;
    // Try and catch
    try {
      // Check if user are valid
      let user = await User.findOne({ email });
      // If there is no user
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      // If there is a user
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      // If does not match
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      // Assign to payload to be used for JWT
      const payload = {
        user: {
          id: user._id
        }
      };
      // Create JWT
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// export module
module.exports = router;
