// commonJS requires because node does not have support for ES2015
// modules i.e. import express from 'express';

const express = require('express');
const mongoose = require('mongoose');

// Many other resources recommend express-session. But not us!
// cookie-session:
//	 encodes all session information inside the cookie itself ("cookie IS the session")
//   bigger cookes = slower
//   limited to around 4kb
// express-session:
// 	 encodes only a single session key in the cookie. ("cookie REFERENCES the session")
//   actual session data resides in session store
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User'); // needs to come before passport, since we reference User in passport.js
require('./services/passport');

mongoose.connect(keys.mongoURI);

// could have multiple apps, but usually not
const app = express();

// app.use registers Express middlewares
// web browser --> request --> (middleware1, middleware2, etc) --> request sent to route handler
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
