var express = require('express');
var bodyParser = require('body-parser');
var config = require('config');
var mongoose = require('mongoose');

var app = express();
app.use(express.static('client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//connect to mongodb
var mongoDbName = config.get('mongoDB.db') || process.env.MONGODB_DB;
var mongoDbUser = config.get('mongoDB.user') || process.env.MONGODB_USER;
var mongoDbPassword = config.get('mongoDB.pw') || process.env.MONGODB_PW;
var mongoDbURL = config.get('mongoDB.url') || process.env.MONGODB_URL;

var mongoConnect = 'mongodb://'+mongoDbUser+':'+mongoDbPassword+mongoDbURL+mongoDbName;
console.log("Connecting to mongoDB with:" + mongoConnect);
//Routes
var Bookmark = require('./routes/Bookmark');
mongoose.connect(mongoConnect, { useNewUrlParser: true }).then(
	()=>{
		console.log("mongoose connected to: " + mongoConnect)
	},
	err=>{
		console.log('err', err);
	}
);

app.route("/api/bookmarks")
	.get(Bookmark.getBookmarks)
	.post(Bookmark.postBookmark);
app.route("/api/bookmarks/:id")
	.put(Bookmark.updateBookmark)
	.delete(Bookmark.deleteBookmark);

module.exports = app.listen(3000, function(){
	console.log('App started on port 3000');
});