require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const port = process.env.PORT || '5000';
require('./models/userModel');
const routes = require('./routes/userRoutes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true }
);

mongoose.connection.on(
  'error',
  console.error.bind(console, 'connection error:')
);

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

routes(app);

app.listen(port, () => console.log(`Rps REST API listening on port ${port}!`));
