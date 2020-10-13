const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const User = require('../models/User');

// @route		POST api/users
// @desc		Register user
// @access	    Public
router.post('/',[
  check('email', 'Not valid email').isEmail(),
  check('password', 'Enter a passwor with 6 or more characters').isLength({
    min: 6,
  }),
] ,(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.send('done')
  }
);

module.exports = router;