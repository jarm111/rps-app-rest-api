const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const Users = require("./models/userModel");
const routes = require('./routes/userRoutes');

// app.get('/', (req, res) => res.send('Hello World!'));

mongoose.connect('mongodb://localhost/RpsUsersdb');
mongoose.connection.on(
  'error',
  console.error.bind(console, 'connection error:')
);

routes(app);

app.listen(port, () => console.log(`Rps REST API listening on port ${port}!`));
