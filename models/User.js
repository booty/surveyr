const mongoose = require('mongoose');
// ES2015 destructuring -- same as const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String
});

mongoose.model('users', userSchema);
