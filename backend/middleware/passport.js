const passport = require('passport');
// const JwtStrategy = require('passport-jwt').Strategy,
//   ExtractJwt = require('passport-jwt').ExtractJwt;

const dotenv = require('dotenv');
dotenv.config();

// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = process.env.jwtSecret;
// // opts.issuer = 'accounts.examplesoft.com';
// // opts.audience = 'yoursite.net';
// passport.use(
//   new JwtStrategy(opts, function (jwt_payload, done) {
//     User.findOne({ id: jwt_payload.sub }, function (err, user) {
//       if (err) {
//         return done(err, false);
//       }
//       if (user) {
//         return done(null, user);
//       } else {
//         return done(null, false);
//         // or you could create a new account
//       }
//     });
//   })
// );

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
// const mongoose = require('mongoose');
// const User = mongoose.model('user');
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
