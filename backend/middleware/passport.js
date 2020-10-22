const passport = require('passport');

const dotenv = require('dotenv');
dotenv.config();

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.jwtSecret;

passport.use(
  new JWTStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.user);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      console.error(error);
    }
  })
);

module.exports = passport;
