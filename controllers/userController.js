const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

exports.createUser = (req, res) => {
  new User(req.body).save((err, user) => {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.readUserByName = (req, res) => {
  User.findOne({ name: req.params.name }, (err, user) => {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.updateUserBestScoreByName = (req, res) => {
  const newBestScore = req.body.bestScore;
  User.findOneAndUpdate(
    { name: req.params.name },
    { bestScore: newBestScore },
    { new: true },
    (err, user) => {
      if (err) res.send(err);
      res.json(user);
    }
  );
};

exports.getTokenAndScore = (req, res) => {
  const token = jwt.sign(
    {
      googleId: req.user.googleId
    },
    process.env.SECRET,
    { expiresIn: '1d', issuer: 'RPS-App' }
  );
  res.json({ token, bestScore: req.user.bestScore });
};
