const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Создаем модель Exercise'a
const ExerciseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  measurementType: {
    type: String,
    required: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('exercise', ExerciseSchema);
