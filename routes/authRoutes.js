const passport = require('passport');

module.exports = app => {
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

	app.get('/api/logout', (req, res) => {
		req.logout(); // attached to req. object by passport
		res.send('ok, signed out');
	});

	app.get('/api/current_user', (req, res) => {
		console.log('req.user is', req.user);
		res.send(req.session);
	});
};
