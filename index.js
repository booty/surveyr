// commonJS - node does not have support for ES2015 modeules i.e. import express from 'express';
const express = require('express');

// could have multiple apps, but usually not
const app = express();

// app.get creates a route handler for a GET.
// obv could also be PUT, POST, DELETE, etc
app.get('/', (req, res) => {
	res.send({ hi: 'there' });
});

app.listen(5000);