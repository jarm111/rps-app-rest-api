const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const mongoose = require('mongoose');

module.exports = function passportConfig() {
  passport.use(
    new GoogleTokenStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      },
      (accessToken, refreshToken, profile, done) => {
        const User = mongoose.model('User');
        User.findOneOrCreate({ googleId: profile.id }, (err, user) => {
          return done(err, user);
        });
      }
    )
  );
};
