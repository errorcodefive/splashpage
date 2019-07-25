var express = require('express');
var cookieParser = require('cookieparser');
var session = require('express-session');
var bodyParser = require('body-parser');
var config = require('config');
var mongoose = require('mongoose');
var path = require('path');
var jwt = require('jsonwebtoken');
var user = require('./schemas/users');

var app = express();

console.log("using: " + __dirname+'/dist');
app.use(express.static(__dirname+'/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(cookieParser());
// app.use(session({secret: "secret is here"}));

console.log("Checking if development or production:");
process_env = process.env.NODE_ENV || 'development';
console.log("The environment is: " + process_env);

console.log("Begin config var loading:");

//connect to mongodb

if (process_env == "development") {
	
	var mongoDbName = config.mongoDB.db;
	var mongoDbUser = config.mongoDB.user;
	var mongoDbPassword = config.mongoDB.pw;
	var mongoDbURL = config.mongoDB.url;
	var jwttokenkey = config.jwt.key;

} else {

	var mongoDbName = process.env.MONGODB_DB;
	var mongoDbUser = process.env.MONGODB_USER;
	var mongoDbPassword = process.env.MONGODB_PW;
	var mongoDbURL = process.env.MONGODB_URL;
	var jwttokenkey = process.env.JSONWEBTOKENKEY;

}

var mongoConnect = 'mongodb://'+mongoDbUser+':'+mongoDbPassword+mongoDbURL+mongoDbName;
console.log("Connecting to mongoDB with:" + mongoConnect);
//Routes
var Bookmark = require('./routes/Bookmark');
require('./routes/User')(app);

mongoose.connect(mongoConnect, { useNewUrlParser: true }).then(
	()=>{
		console.log("Mongoose connected successfully to: " + mongoConnect)
	},
	err=>{
		console.log('ERROR: Mongoose did not connect.', err);
	}
);

//setting up json web token use
app.use(function(req, res, next){
	try{
		const token = req.headers.authorization.split(" ")[1]
		jwt.verify(token, jwttokenkey, function(err,payload){
			console.log("Payload: " + payload);
			if (payload){
				user.findById(payload.userId).then(
					(doc)=>{
						req.user=doc;
						next()
					}
				)
			} else {
				console.log("Payload does not exist");
				next()
			}
		})
	} catch (e){
		console.log("Error: " + e);
		next()
	}
});

app.route("/api/bookmarks")
	.get(Bookmark.getBookmarks)
	.post(Bookmark.postBookmark);
app.route("/api/bookmarks/:id")
	.put(Bookmark.updateBookmark)
	.delete(Bookmark.deleteBookmark);


//if no cookie then go to login.html
//otherwise go to index.html

// This is a catchall for all other route cases
app.get('/login', (req,res)=>{
	console.log("Get request for login");
	res.sendFile(path.resolve(__dirname, './dist/login.html'));
});
app.get('*', (req,res)=>{
	res.sendFile(path.resolve(__dirname,'/dist/index.html'));
	//res.sendFile(path.resolve(__dirname,'/dist/index.html'));
});

module.exports = app.listen(process.env.PORT || 8080, function(){
	console.log('App started on port: '+process.env.port +' or 8080');
});