const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();
const passport = require('../backend/middleware/passport');
const app = express();

// Коннектим базу данных
connectDB();

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Api working' });
});

// Определяем роуты
app.use('/api/auth', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/auth', require('./routes/verify'));

app.use(
  '/api/user',
  passport.authenticate('jwt', { session: false }),
  require('./routes/auth')
);
app.use(
  '/api/exercises',
  passport.authenticate('jwt', { session: false }),
  require('./routes/exercises')
);

app.use(
  '/api/workouts',
  passport.authenticate('jwt', { session: false }),
  require('./routes/workouts')
);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
