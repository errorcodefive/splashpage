var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rssfeedSchema = new Schema({
    name: {type: String, required: true},
    link: {type: String, required: true},
    description:{type: String, required: true}
});

module.exports = mongoose.model('RSSFeed', rssfeedSchema);