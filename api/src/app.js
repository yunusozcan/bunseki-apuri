const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const strategy = require('./strategy');

const clientSideApiV1 = require('./controllers/api/v1/client-side');
const dashboardApiV1 = require('./controllers/api/v1/dashboard');

const app = express();

app.use(bodyParser.json());
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

passport.use('client-side', strategy);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/client-side', clientSideApiV1);
app.use('/api/v1/dashboard', dashboardApiV1);

module.exports = app;

