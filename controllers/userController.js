const mongoose = require('mongoose');
const Users = mongoose.model('Users');

exports.addUser = (req, res) => {
  new Users(req.body).save((err, user) => {
    if (err) res.send(err);
    res.json(user);
  });
};
