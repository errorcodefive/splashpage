var express = require('express');
var bodyParser = require('body-parser');
var config = require('config');
var mongoose = require('mongoose');

var app = express();
console.log("using: " + __dirname+"client");
app.use(express.static(__dirname+'client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
console.log("Begin config var loading:");
//connect to mongodb
var mongoDbName = process.env.MONGODB_DB;
var mongoDbUser = process.env.MONGODB_USER;
var mongoDbPassword =process.env.MONGODB_PW;
var mongoDbURL = process.env.MONGODB_URL;

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

// This is a catchall for all other route cases
app.get('*', (req,res)=>{
	res.sendfile(path.resolve(__dirname,'client/index.html'));
});

module.exports = app.listen(process.env.PORT || 3000, function(){
	console.log('App started on port:'+process.env.port +'or 3000');
});