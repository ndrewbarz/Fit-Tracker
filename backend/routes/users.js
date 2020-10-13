const express = require('express');
const router = express.Router();


// @route		POST api/users
// @desc		Register user
// @access	    Public
router.post(
  '/',
  async (req, res) => {
    // remove after check in postman
    try {
        res.send('passed');
      

    //   res.send('User saved');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;