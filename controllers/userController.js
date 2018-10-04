const mongoose = require('mongoose');
const User = mongoose.model('User');

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
