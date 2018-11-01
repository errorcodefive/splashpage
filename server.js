var express = require('express');
var bodyParser = require('body-parser');
var config = require('config');
var mongoose = require('mongoose');
var path = require('path');

var app = express();
console.log("using: " + __dirname+'/dist');
app.use(express.static(__dirname+'/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
console.log("Begin config var loading:");

//connect to mongodb
if (process.env.NODE_ENV = "development") {
	var mongoDbName = config.mongoDB.db;
	var mongoDbUser = config.mongoDB.user;
	var mongoDbPassword = config.mongoDB.pw;
	var mongoDbURL = config.mongoDB.url;
} else {
	var mongoDbName = process.env.MONGODB_DB;
	var mongoDbUser = process.env.MONGODB_USER;
	var mongoDbPassword = process.env.MONGODB_PW;
	var mongoDbURL = process.env.MONGODB_URL;
}

var mongoConnect = 'mongodb://'+mongoDbUser+':'+mongoDbPassword+mongoDbURL+mongoDbName;
console.log("Connecting to mongoDB with:" + mongoConnect);
//Routes
var Bookmark = require('./routes/Bookmark');
mongoose.connect(mongoConnect, { useNewUrlParser: true }).then(
	()=>{
		console.log("Mongoose connected successfully to: " + mongoConnect)
	},
	err=>{
		console.log('ERROR: Mongoose did not connect.', err);
	}
);

app.route("/api/bookmarks")
	.get(Bookmark.getBookmarks)
	.post(Bookmark.postBookmark);
app.route("/api/bookmarks/:id")
	.put(Bookmark.updateBookmark)
	.delete(Bookmark.deleteBookmark);

// This is a catchall for all other route cases
app.get('*', (req,res)=>{
	res.sendFile(path.resolve(__dirname,'/dist/index.html'));
});

module.exports = app.listen(process.env.PORT || 3000, function(){
	console.log('App started on port: '+process.env.port +' or 3000');
});