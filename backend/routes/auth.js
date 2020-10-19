const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const dotenv = require('dotenv');
dotenv.config();

// @route		GET api/auth
// @desc		Get Logged in user
// @access	Private
router.get('/', (req, res) => {
  res.send('Get Logged in user');
});

// @route		POST api/auth
// @desc		Auth user & get token
// @access	Public
router.post(
  '/login',
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

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      // Проверка введенных данных
      // Проверка email
      if (!user) {
        return res.status(400).json({ msg: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      // Если пароль не совпадает
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid email or password' });
      }
      // Если Пользователь верифицирован - отдаем токен
      if (user.isVerified) {
        const payload = {
          user: user._id,
        };
        const generateToken = (id) => {
          return jwt.sign(payload, process.env.jwtSecret, {
            expiresIn: '30d',
          });
        };
        res.json({
          _id: user._id,
          email: user.email,
          isVerified: user.isVerified,
          token: generateToken(user._id),
        });
      } else {
        res.send({ msg: 'Please verify your email, check your email' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
