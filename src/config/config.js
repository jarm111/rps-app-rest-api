const convict = require('convict');

const config = convict({
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 5001,
    env: 'PORT',
    arg: 'port'
  },
  dbURI: {
    doc: 'Database connection URI',
    format: String,
    default: 'mongodb://localhost/RpsUsersdb',
    env: 'MONGODB_URI'
  },
  google: {
    clientId: {
      doc: 'Google client ID',
      format: String,
      default: null,
      env: 'GOOGLE_CLIENT_ID'
    },
    clientSecret: {
      doc: 'Google client secret',
      format: String,
      default: null,
      env: 'GOOGLE_CLIENT_SECRET',
      sensitive: true
    }
  },
  token: {
    secret: {
      doc: 'Secred key used to sign the token',
      format: String,
      default: null,
      env: 'JWT_SECRET',
      sensitive: true
    },
    issuer: {
      doc: 'Token issuer used in payload',
      format: String,
      default: 'RPS-App',
      env: 'JWT_ISSUER'
    },
    expiresIn: {
      doc: 'Token expiration time used in payload',
      format: String,
      default: '1d',
      env: 'JWT_EXPIRES_IN'
    }
  }
});

config.validate();

module.exports = config;
