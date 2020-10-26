const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');

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
router.put('/', async (req, res) => {
  try {
    const { exercises } = req.body;

    for await (let exercise of exercises) {
      await Exercise.findByIdAndUpdate(
        { _id: exercise._id },
        { name, measurementType },
        { new: true }
      );
    }

    res.json({ msg: 'Exercise Updated', exercise });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route		DELETE api/exercises:id
// @desc		Delete specific exercise
router.delete('/:_id', async (req, res) => {
  try {
    await Exercise.findByIdAndDelete(req.params._id);
    res.json({ msg: 'deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
