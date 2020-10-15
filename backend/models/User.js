const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Создаем модель User'a
const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
    required: true,
  },
  verifyCode: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', UserSchema);
