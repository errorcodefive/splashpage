var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookmarkSchema = new Schema({
	//id: Number,
	name: String,
	link: String,
	order: {
		type: Number
	},
	command: String,
	query_url: String
});

module.exports = mongoose.model ('Bookmark', bookmarkSchema);