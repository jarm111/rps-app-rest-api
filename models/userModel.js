const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: "User's Google ID required"
  },
  bestScore: { type: Number, min: 0, default: 0 }
});

userSchema.statics.findOneOrCreate = function(condition, callback) {
  const self = this;
  self.findOne(condition, (err, result) => {
    return result
      ? callback(err, result)
      : self.create(condition, (err, result) => {
          return callback(err, result);
        });
  });
};

module.exports = mongoose.model('User', userSchema);
