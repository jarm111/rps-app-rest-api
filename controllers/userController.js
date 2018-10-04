const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.addUser = (req, res) => {
  new User(req.body).save((err, user) => {
    if (err) res.send(err);
    res.json(user);
  });
};
