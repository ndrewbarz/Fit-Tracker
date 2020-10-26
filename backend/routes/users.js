const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const dotenv = require('dotenv');
dotenv.config();

// @route		POST api/users
// @desc		Register user
// @access	Public
router.post(
  '/register',
  [
    check('email', 'Not valid email').isEmail(),
    check('password', 'Enter a passwor with 6 or more characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, isVerified, verifyCode } = req.body;

    try {
      // Check if user exist
      const userExists = await User.findOne({ email });
      // if true
      if (userExists) {
        return res.status(400).json({ msg: 'User exist' });
      }

      // Create new user
      const user = new User({
        email,
        password,
        isVerified,
        verifyCode,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      let code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      user.verifyCode = code;

      let verifyLink = `http://localhost:3000/account/verify?email=${user.email}`;
      console.log(`Link: ${verifyLink}, Code: ${code}`);
      // Save user
      await user.save();

      res.json({ verifyCode: user.verifyCode, verifyLink });
    } catch (err) {
      res.status(500).send({ msg: err.message });
    }
  }
);

module.exports = router;
