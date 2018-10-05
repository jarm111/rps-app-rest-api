const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const User = require('./models/userModel');
const bodyParser = require('body-parser');
const routes = require('./routes/userRoutes');

// app.get('/', (req, res) => res.send('Hello World!'));

mongoose.connect(
  'mongodb://localhost/RpsUsersdb',
  { useNewUrlParser: true }
);
mongoose.connection.on(
  'error',
  console.error.bind(console, 'connection error:')
);

app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.listen(port, () => console.log(`Rps REST API listening on port ${port}!`));
