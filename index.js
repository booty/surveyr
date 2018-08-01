// commonJS - node does not have support for ES2015 modeules i.e. import express from 'express';
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys.js');

// could have multiple apps, but usually not
const app = express();

// app.get creates a route handler for a GET.
// obv could also be PUT, POST, DELETE, etc
app.get('/', (req, res) => {
	res.send({ hi: 'is anybody there?' });
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			console.log('refreshToken', refreshToken);
			console.log('accessToken', accessToken);
			console.log('profile', profile);
		}
	)
);

app.get(
	'/auth/google',
	// the 'google' string here is one that GoogleStrategy recognizes
	passport.authenticate('google', {
		// these are scopes that Google recognizes, not Passport-specific
		scope: ['profile', 'email']
	})
);

// Google strategy will read the info sent by Google and is
// smart enough to know that it's a callback
app.get('/auth/google/callback', passport.authenticate('google'));

// When Heroku runs our app, it sets/injects environment variables
// Will (may) be different on every run
const PORT = process.env.PORT || 5000;
app.listen(PORT);
