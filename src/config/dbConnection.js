const mongoose = require('mongoose');
const config = require('./config');

module.exports = function dbConnection() {
  mongoose.connect(
    config.get('dbURI'),
    { useNewUrlParser: true, useFindAndModify: false }
  );

  mongoose.connection.on(
    'error',
    console.error.bind(console, 'connection error:')
  );
};
