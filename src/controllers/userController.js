const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

exports.getTokenAndBestScore = (req, res) => {
  const token = jwt.sign(
    {
      googleId: req.user.googleId
    },
    process.env.SECRET,
    { expiresIn: '1d', issuer: 'RPS-App' }
  );
  res.json({ token, bestScore: req.user.bestScore });
};

exports.authenticateUser = (req, res, next) => {
  const errorMessage = 'authorization header must be form: Bearer token';
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.send(errorMessage);
  const parts = authHeader.split(' ');
  if (parts.length !== 2) return res.send(errorMessage);
  const scheme = parts[0];
  const credentials = parts[1];
  if (!/^Bearer$/i.test(scheme)) return res.send(errorMessage);
  const token = credentials;
  jwt.verify(
    token,
    process.env.SECRET,
    { issuer: 'RPS-App' },
    (err, decoded) => {
      if (err) return res.send(err);
      res.locals.googleId = decoded.googleId;
      next();
    }
  );
};

exports.updateUserBestScore = (req, res) => {
  const newBestScore = req.body.bestScore;
  if (!newBestScore)
    return res.send('bestScore: number is required in request body');
  User.findOneAndUpdate(
    { googleId: res.locals.googleId },
    { bestScore: newBestScore },
    { new: true },
    err => {
      if (err) return res.send(err);
      res.send("Successfully updated user's best score to " + newBestScore);
    }
  );
};
