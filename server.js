var express = require('express');
var bodyParser = require('body-parser');
var config = require('config');
var mongoose = require('mongoose');

var app = express();
app.use(express.static('client'));
app.use(bodyParser.json());

//connect to mongodb
var mongoDbName = config.get('mongoDB.db') || process.env.MONGODB_DB;
var mongoDbUser = config.get('mongoDB.user') || process.env.MONGODB_USER;
var mongoDbPassword = config.get('mongoDB.pw') || process.env.MONGODB_PW;
var mongoDbURL = config.get('mongoDB.url') || process.env.MONGODB_URL;

var mongoConnect = 'mongodb://'+mongoDbUser+':'+mongoDbPassword+mongoDbURL+mongoDbName;
console.log("Connecting to mongoDB with:" + mongoConnect);
//Schemas	
//var Bookmark = require('./schemas/bookmarks');
var Bookmark = require('./routes/Bookmark');
mongoose.connect(mongoConnect, {userNewUrlParser: true}).then(
	()=>{
		console.log("mongoose connected to: " + mongoConnect)
	},
	err=>{
		console.log('err', err);
	}
);
//var db = mongoose.connection;

app.route("/api/bookmarks")
	.get(Bookmark.getBookmarks);
	//.post(Bookmark.postBookmark);

// app.post('/api/bookmarks', (req, res)=>{
// 	var newBookmark = new Bookmark(
// 		{
// 			name: req.body.name,
// 			link: req.body.link
// 		}
// 	);
// 	console.log("Received POST bookmark request");
// 	console.log("Name/URL: " + newBookmark.name + "/" + newBookmark.link);
// 	//newBookmark.id = bookmarks.length+1;
// 	console.log("New BM" + JSON.stringify(newBookmark));
// 	console.log("Created new bookmark");

// 	newBookmark.save().then(
// 		()=>{return res.json({success: true})}
// 	).catch(
// 		(err)=>{console.log("err",err)}
// 	);
// });

app.put('/api/bookmarks', (req, res) =>{
	console.log('Received Update Bookmark Request');
	var updateId = {_id: req.body._id};
	var updateValues = {
		name: req.body.name,
		link: req.body.link,
		command: req.body.command,
		query_url: req.body.query_url
	};
	console.log("Querying for ID: " + updateId._id);

	Bookmark.update(updateId, updateValues).then(
		()=>{res.json({success: true})}
	).catch(
		(err)=>{console.log("err", err)}
	);

});
//callback
app.delete('/api/bookmarks', (req, res) => {
	console.log("Received Delete Bookmark Request");
	console.log('Name:' + req.body.name);
	try{
		bookmarkID = req.body._id;
	} catch (error){
		res.status(422).json({message: 'Invalid ID format: ${error}'});
		return;
	}
	console.log("Trying to delete: " + bookmarkID);

	Bookmark.deleteOne({_id: bookmarkID}).then(
		()=>{return res.json({success: true})}
	).catch(
		(err)=>{res.status(404).json({message: "No bookmark deleted: $(err)"})}
	);

});

module.exports = app.listen(3000, function(){
	console.log('App started on port 3000');
});