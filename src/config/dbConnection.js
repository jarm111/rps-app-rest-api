const mongoose = require('mongoose');
const config = require('./config');

module.exports = function dbConnection() {
  mongoose.connect(
    config.get('db.host') + config.get('db.name'),
    { useNewUrlParser: true, useFindAndModify: false }
  );

  mongoose.connection.on(
    'error',
    console.error.bind(console, 'connection error:')
  );
};
