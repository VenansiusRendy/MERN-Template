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
// Import User Model Schema
const User = require('../models/User');

// Create Route
const router = express.Router();
// Route Description
// @route   POST  api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  // Check Field
  [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Error Checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if there is a user findOne is mongoose method
      let user = await User.findOne({ email });
      // If there is a match, return error
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      // If not create new user object
      user = new User({
        name,
        email,
        password,
      });
      // Encrypt password with bcrypt
      // 1. Create salt necessary to hash password
      const salt = await bcrypt.genSalt(10);
      // 2. Hash the password
      user.password = await bcrypt.hash(password, salt);
      // Save to server
      await user.save();
      // Assign to payload to be used for JWT
      const payload = {
        user: {
          id: user._id,
        },
      };
      // Create JWT
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
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
