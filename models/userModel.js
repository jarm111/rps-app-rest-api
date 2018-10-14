const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: "User's Google ID required"
  },
  bestScore: { type: Number, min: 0, default: 0 }
});

module.exports = mongoose.model('User', userSchema);
