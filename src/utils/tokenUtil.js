const jwt = require('jsonwebtoken');

exports.generateToken = payload => {
  return jwt.sign(payload, process.env.SECRET, {
    expiresIn: process.env.EXPIRES_IN,
    issuer: process.env.ISSUER
  });
};

exports.verifyToken = (token, callback) => {
  jwt.verify(
    token,
    process.env.SECRET,
    { issuer: process.env.ISSUER },
    callback
  );
};
