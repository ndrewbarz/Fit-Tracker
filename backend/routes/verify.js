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
    // Check data
    if (!user) {
      return res.status(400).json({ msg: 'invalid inputs' });
    }

    // Check verify code
    if (verifyCode === user.verifyCode) {
      // If user verified - send token
      await user.updateOne({ isVerified: true }, { new: true });
      const updatedUser = await User.findOne({ email });

      const payload = {
        user: updatedUser._id,
      };
      const generateToken = (id) => {
        return jwt.sign(payload, process.env.jwtSecret, {
          expiresIn: '30d',
        });
      };
      res.json({
        _id: updatedUser._id,
        email: updatedUser.email,
        isVerified: updatedUser.isVerified,
        exercises: updatedUser.exercises,
        workouts: updatedUser.workouts,
        token: generateToken(updatedUser._id),
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
