// NODE_ENV is automatically set by heroku
if (process.env.NODE_ENV === 'production') {
	module.exports = require('./prod');
} else {
	module.exports = require('./dev');
}
