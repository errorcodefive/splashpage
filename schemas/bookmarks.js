var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookmarkSchema = new Schema({
	//id: Number,
	name: {type: String, required: true},
	link: {type: String, required: true},
	order: {
		type: Number
	},
	command: String,
	query_url: String
});

module.exports = mongoose.model ('Bookmark', bookmarkSchema);