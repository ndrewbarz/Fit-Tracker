const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const { findByIdAndDelete } = require('../models/Exercise');
const Exercise = require('../models/Exercise');
// const User = require('../models/User');
// const Workout = require('../models/Workout');

// @route		POST api/exercise
// @desc		Create exercise
router.post('/:userId', async (req, res) => {
  const { name, measurementType } = req.body;
  try {
    const newExercise = new Exercise({
      name,
      measurementType,
      userId: req.params.userId,
    });

    const exercise = await newExercise.save();

    // return res.json({
    //   name: exercise.name,
    //   measurementType: exercise.measurementType,
    // });

    return res.json({
      name: exercise.name,
      measurementType: exercise.measurementType,
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route		GET api/exercises
// @desc		Get all exercises
router.get('/:userId', async (req, res) => {
  try {
    const exercises = await Exercise.find({ userId: req.params.userId });

    res.json(exercises);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route		GET api/exercises:id
// @desc		Get specific exercise
router.get('/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    res.json({ exercise });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route		PUT api/exercises:id
// @desc		Update specific exercise
router.put('/:id', async (req, res) => {
  const { name, measurementType } = req.body;

  try {
    const exercise = await Exercise.findByIdAndUpdate(
      { _id: req.params.id },
      { name, measurementType },
      { new: true }
    );
    // exercise.name = name;
    // exercise.measurementType = measurementType;

    // await exercise.save();
    res.json({ msg: 'Exercise Updated', exercise });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route		DELETE api/exercises:id
// @desc		Delete specific exercise
router.delete('/:id', async (req, res) => {
  try {
    // await Exercise.findByIdAndDelete(req.params.id);
    // const workouts = await Workout.find({ exercises: req.params.id });
    // console.log(workouts);
    // user.workouts
    // res.json(exercise);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
