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
      // Проверяем существует ли пользователь
      const userExists = await User.findOne({ email });
      // Если существует
      if (userExists) {
        return res.status(400).json({ msg: 'User exist' });
      }

      // Если пользователя нет, определяем нового
      const user = new User({
        email,
        password,
        isVerified,
        verifyCode,
      });
      // перед сохранением пользователя в БД пароль нужно зашифровать (encrypted)
      const salt = await bcrypt.genSalt(10);
      // Хэш версия строкового пароля
      user.password = await bcrypt.hash(password, salt);

      let code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      user.verifyCode = code;

      let verifyLink = `http://localhost:3000/account/verify?email=${user.email}`;
      // Сохр. юзера
      await user.save();

      res.json({ verifyCode: user.verifyCode, verifyLink });
    } catch (err) {
      res.status(500).send({ msg: err.message });
    }
  }
);

module.exports = router;
