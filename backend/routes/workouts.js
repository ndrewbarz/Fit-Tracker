const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const Workout = require('../models/Workout');

// @route		POST api/workout
// @desc		Create new workout
router.post('/:userId', async (req, res) => {
  const { date, exercises } = req.body;
  try {
    const newWorkout = new Workout({
      userId: req.params.userId,
      exercises,
      // date: date || Date.now(),
      date,
    });

    const workout = await newWorkout.save();

    return res.json(workout);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// @route		PUT api/workout
// @desc		Update workout
router.put('/:id', async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id);

    await workout.save();
    res.json(workout);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route		GET api/workout
// @desc		Get all workouts
router.get('/:userId', async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId });

    res.json(workouts);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
