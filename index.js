// commonJS - node does not have support for ES2015 modeules i.e. import express from 'express';
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User'); // needs to come before passport, since we reference User in passport.js
require('./services/passport');

mongoose.connect(keys.mongoURI);

// could have multiple apps, but usually not
const app = express();

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // expects milliseconds
		keys: [keys.cookieKey] // cookies are automatically encrypted. (ideally, would be salted somehow?)
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/routes')(app);
require('./routes/authRoutes')(app);

// When Heroku runs our app, it sets/injects environment variables
// Will (may) be different on every run
const PORT = process.env.PORT || 5000;
app.listen(PORT);
