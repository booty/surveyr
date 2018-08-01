// commonJS - node does not have support for ES2015 modeules i.e. import express from 'express';
const express = require('express');
require('./services/passport');

// could have multiple apps, but usually not
const app = express();

require('./routes/routes')(app);
require('./routes/authRoutes')(app);

// When Heroku runs our app, it sets/injects environment variables
// Will (may) be different on every run
const PORT = process.env.PORT || 5000;
app.listen(PORT);
