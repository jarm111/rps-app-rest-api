const convict = require('convict');

const config = convict({
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 5001,
    env: 'PORT',
    arg: 'port'
  },
  db: {
    host: {
      doc: 'Database host name/IP',
      format: '*',
      default: 'mongodb://localhost/',
      env: 'DB_HOST'
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'RpsUsersdb',
      env: 'DB_NAME'
    }
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
      env: 'SECRET',
      sensitive: true
    },
    issuer: {
      doc: 'Token issuer used in payload',
      format: String,
      default: 'RPS-App',
      env: 'ISSUER'
    },
    expiresIn: {
      doc: 'Token expiration time used in payload',
      format: String,
      default: '1d',
      env: 'EXPIRES_IN'
    }
  }
});

config.validate();

module.exports = config;
