var express = require('express');
var bodyParser = require('body-parser');
var config = require('config');
var mongoose = require('mongoose');

var app = express();
app.use(express.static('client'));
app.use(bodyParser.json());

//connect to mongodb
var mongoDbName = config.get('mongoDB.db');
var mongoDbUser = config.get('mongoDB.user');
var mongoDbPassword = config.get('mongoDB.pw');

var mongoConnect = 'mongodb://'+mongoDbUser+':'+mongoDbPassword+'@ds151070.mlab.com:51070/'+mongoDbName;

//Schemas
var Bookmark = require('./schemas/bookmarks');

mongoose.connect(mongoConnect, (err, db) => {
	if (err) {
		console.log('err', err);
	}
	else {
		console.log("mongoose connected to: " + mongoConnect);
	}
});

app.get('/api/bookmarks', (req, res)=>{
	Bookmark.find((err, bookmarks)=>{
		if(err) return err;
		return res.json({ success: true, data: bookmarks })
	});
	//var metadata = { total_count: bookmarks.length };
	//res.json({ _metadata: metadata, records: bookmarks });
});

app.post('/api/bookmarks', (req, res)=>{
	var newBookmark = new Bookmark(
		{
			name: req.body.name,
			link: req.body.link
		}
	);
	console.log("Received new bookmark request");
	console.log("Name/URL: " + newBookmark.name + "/" + newBookmark.link);
	//newBookmark.id = bookmarks.length+1;
	console.log("New BM" + JSON.stringify(newBookmark));
	console.log("Created new bookmark");

	newBookmark.save(err=> {
		if(err) return err;
		return res.json({success: true});
	});
});

app.delete('/api/bookmarks/:id', (req, res) => {
	try{
		bookmarkID = newObjectID(req.params.id);
	} catch (error){
		res.status(422).json({message: 'Invalid ID format: ${error}'});
		return;
	}
	db.collection('bookmarks').deleteOne({_id: bookmarkID }).then((delResult) =>{
		if(delResult.result.n ===1) res.json({status: 'Deleted'});
		else res.json({status: "Object to delete not found"});
	})
	.catch(err=>{
		console.log(err);
		res.status(500).json({message: "Internal server error ${error}"});
	});
});

app.listen(3000, function(){
	console.log('App started on port 3000');
});