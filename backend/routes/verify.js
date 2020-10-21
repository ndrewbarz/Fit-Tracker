const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route		POST api/auth
// @desc		Verify user & get token
// @access	    Public
router.post('/verify', async (req, res) => {
  const { email, verifyCode } = req.body;

  try {
    const user = await User.findOne({ email });
    // Проверка введенных данных
    // Проверка email
    if (!user) {
      return res.status(400).json({ msg: 'invalid inputs' });
    }

    // Проверяем код верификации
    if (verifyCode === user.verifyCode) {
      // Если пользователь верифицирован - отправляем токен
      await user.updateOne({ isVerified: true }, { new: true });

      const payload = {
        user: user._id,
      };
      const generateToken = (id) => {
        return jwt.sign(payload, process.env.jwtSecret, {
          expiresIn: '30d',
        });
      };
      res.json({
        // _id: user._id,
        // email: user.email,
        isVerified: user.isVerified,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ msg: 'invalid verify code' });
    }
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
