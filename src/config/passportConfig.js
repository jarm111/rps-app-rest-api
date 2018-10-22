const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const mongoose = require('mongoose');
const config = require('./config');

module.exports = function passportConfig() {
  passport.use(
    new GoogleTokenStrategy(
      {
        clientID: config.get('google.clientId'),
        clientSecret: config.get('google.clientSecret')
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
