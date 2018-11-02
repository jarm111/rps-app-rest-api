const validator = require('validator');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const tokenUtil = require('../utils/tokenUtil');
const headerUtil = require('../utils/headerUtil');

exports.getTokenAndBestScore = (req, res) => {
  const token = tokenUtil.generateToken({ googleId: req.user.googleId });
  res.status(200).json({ token, bestScore: req.user.bestScore });
};

exports.authenticateUser = (req, res, next) => {
  const token = headerUtil.extractToken(req.headers['authorization']);
  if (!token) {
    return res
      .status(400)
      .send('authorization header must be form: Bearer token');
  }
  if (!validator.isJWT(token)) {
    return res.status(400).send('Provided token is not jwt');
  }
  tokenUtil.verifyToken(token, (err, decoded) => {
    if (err) return res.status(401).send(err);
    res.locals.googleId = decoded.googleId;
    next();
  });
};

exports.updateUserBestScore = (req, res) => {
  const newBestScore = req.body.bestScore;
  if (!newBestScore) {
    return res
      .status(400)
      .send('bestScore: integer number is required in request body');
  }
  if (!validator.isInt(newBestScore.toString())) {
    return res.status(400).send('bestScore needs to be integer number');
  }
  User.findOneAndUpdate(
    { googleId: res.locals.googleId },
    { bestScore: newBestScore },
    { new: true },
    err => {
      if (err) return res.send(err);
      res
        .status(201)
        .send("Successfully updated user's best score to " + newBestScore);
    }
  );
};
