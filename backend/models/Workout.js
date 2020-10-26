const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Создаем модель Workout'a
const WorkoutSchema = mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  date: { type: Date, require: true, default: new Date() },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'exercise',
    },
  ],
});

module.exports = mongoose.model('workout', WorkoutSchema);
