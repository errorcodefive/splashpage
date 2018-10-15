var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookmarkSchema = new Schema({
	//id: Number,
	name: {type: String, required: true},
	link: {type: String, required: true},
	order: {
		type: Number
	},
	command: {type: String},
	query_url: {type: String}
});

module.exports = mongoose.model ('Bookmark', bookmarkSchema);