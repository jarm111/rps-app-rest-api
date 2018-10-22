const mongoose = require('mongoose');
const User = mongoose.model('User');
const tokenUtil = require('../utils/tokenUtil');
const headerUtil = require('../utils/headerUtil');

exports.getTokenAndBestScore = (req, res) => {
  const token = tokenUtil.generateToken({ googleId: req.user.googleId });
  res.json({ token, bestScore: req.user.bestScore });
};

exports.authenticateUser = (req, res, next) => {
  const token = headerUtil.processAuthHeader(req.headers['authorization']);
  if (!token)
    return res.send('authorization header must be form: Bearer token');
  tokenUtil.verifyToken(token, (err, decoded) => {
    if (err) return res.send(err);
    res.locals.googleId = decoded.googleId;
    next();
  });
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
