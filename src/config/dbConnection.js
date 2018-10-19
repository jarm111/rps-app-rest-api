const mongoose = require('mongoose');

module.exports = function dbConnection() {
  mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true }
  );

  mongoose.connection.on(
    'error',
    console.error.bind(console, 'connection error:')
  );
};
