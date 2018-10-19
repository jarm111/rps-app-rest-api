require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const port = process.env.PORT || '5000';
const dbConnection = require('./config/dbConnection');
const passportConfig = require('./config/passportConfig');
require('./models/userModel');
const routes = require('./routes/userRoutes');

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

passportConfig();
dbConnection();
routes(app);
app.listen(port, () => console.log(`Rps REST API listening on port ${port}!`));
