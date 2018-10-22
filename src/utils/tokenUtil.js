const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.generateToken = payload => {
  return jwt.sign(payload, config.get('token.secret'), {
    expiresIn: config.get('token.expiresIn'),
    issuer: config.get('token.issuer')
  });
};

exports.verifyToken = (token, callback) => {
  jwt.verify(
    token,
    config.get('token.secret'),
    { issuer: config.get('token.issuer') },
    callback
  );
};
