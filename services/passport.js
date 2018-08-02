const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys.js');
const User = mongoose.model('users');

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			// console.log('refreshToken', refreshToken);
			// console.log('accessToken', accessToken);
			// console.log('profile', profile);

			// MongoDB queries are always async
			// They return promises. Later we'll refact to not use a promise.
			User.findOne({ googleId: profile.id }).then(existingUser => {
				if (existingUser) {
					console.log('found existing user');
					// null is the error code that passport expects apparently
					done(null, existingUser);
				} else {
					console.log('will create user');
					new User({ googleId: profile.id }).save().then(user => done(null, user));
				}
			});
		}
	)
);
