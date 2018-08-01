module.exports = app => {
	// app.get creates a route handler for a GET.
	// obv could also be PUT, POST, DELETE, etc
	app.get('/', (req, res) => {
		res.send({ hi: 'is anybody there? ok cool!' });
	});
};
