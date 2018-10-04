const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'User name required'
  },
  bestScore: { type: Number, min: 0, default: 0 }
});

module.exports = mongoose.model('User', userSchema);
