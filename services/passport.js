const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	console.log('serializeUser: user is', user);
	console.log('serializeUser: user.id is', user.id);
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	console.log('deserializeUser: id is', id);
	User.findById(id).then(user => {
		console.log('deserializeUser: user is', user);
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }).then(existingUser => {
				if (existingUser) {
					// we already have a record with the given profile ID
					console.log('GoogleStrategy: already have user with profile.id', profile.id);
					done(null, existingUser);
				} else {
					// we don't have a user record with this ID, make a new record!
					console.log('GoogleStrategy: will create user with profile.id', profile.id);
					new User({ googleId: profile.id }).save().then(user => done(null, user));
				}
			});
		}
	)
);
