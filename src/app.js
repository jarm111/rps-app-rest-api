require('dotenv').config();
const config = require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const helmet = require('helmet');
const port = config.get('port');
const dbConnection = require('./config/dbConnection');
const passportConfig = require('./config/passportConfig');
require('./models/userModel');
const routes = require('./routes/userRoutes');

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

passportConfig();
dbConnection();
routes(app);
app.listen(port, () => console.log(`Rps REST API listening on port ${port}!`));
