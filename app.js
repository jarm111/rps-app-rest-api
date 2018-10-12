const express = require('express');
const app = express();
require('dotenv').config();
const port = 5000;
const mongoose = require('mongoose');
const User = require('./models/userModel');
const bodyParser = require('body-parser');
const routes = require('./routes/userRoutes');
const cors = require('cors');

app.use(cors());

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true }
);
mongoose.connection.on(
  'error',
  console.error.bind(console, 'connection error:')
);

app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.listen(port, () => console.log(`Rps REST API listening on port ${port}!`));
