// commonJS - node does not have support for ES2015 modeules i.e. import express from 'express';
const express = require('express');

// could have multiple apps, but usually not
const app = express();

// app.get creates a route handler for a GET.
// obv could also be PUT, POST, DELETE, etc
app.get('/', (req, res) => {
	res.send({ hi: 'is anybody there?' });
});

// When Heroku runs our app, it sets/injects environment variables
// Will (may) be different on every run
const PORT = process.env.PORT || 5000;
app.listen(PORT);
