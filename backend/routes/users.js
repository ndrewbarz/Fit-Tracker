const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const dotenv = require('dotenv')
dotenv.config()

// @route		POST api/users
// @desc		Register user
// @access	Public
router.post('/',[
  check('email', 'Not valid email').isEmail(),
  check('password', 'Enter a passwor with 6 or more characters').isLength({
    min: 6,
  }),
] , async (req, res) => {
  console.log(req.params)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password, isVerified, verifyCode} = req.body

    try {
      // Проверяем существует ли пользователь
      let user = await User.findOne({ email });
      // Если существует
      if(user) {
        return res.status(400).json({msg: "User exist"})
      }

      // Если пользователя нет, определяем нового
      user = new User({
        email,
        password,
        isVerified,
        verifyCode
      })
      // перед сохранением пользователя в БД пароль нужно зашифровать (encrypted)
      const salt = await bcrypt.genSalt(10)
      // Хэш версия строкового пароля
      user.password = await bcrypt.hash(password, salt)

      let code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      user.verifyCode = code

      // Сохр. юзера
      await user.save();

      // const payload = {user: {
      //   id: user.id
      // }}

      // jwt.sign(payload, process.env.jwtSecret, {
      //   expiresIn: 360000
      // }, (err, token) => {
      //   if(err) throw new Error

      // })
        res.json({user})
        // res.status(200).send('Passed')
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
);

module.exports = router;