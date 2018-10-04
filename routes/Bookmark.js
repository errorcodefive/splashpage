var mongoose = require('mongoose');
var Bookmark = require('../schemas/bookmarks');

function getBookmarks(req,res){
    console.log("Received GET Bookmark request");
    let query = Bookmark.find({});
    query.exec((err,bookmarks)=>{
        if(err) res.send(err);
        res.json({success: true, data: bookmarks});
    });
}

function postBookmark(req, res){
    console.log("Received POST bookmark request");
    var newBookmark = new Bookmark(
        {
            name: req.body.name,
            link: req.body.link
        }
    );

    newBookmark.save((err,newbm)=>{
        if(err) res.send(err);
        else{
            res.json({success: true});
        }
    });
}

function updateBookmark(req, res){
    console.log("Received PUT bookmark request");
    var updateID = {_id: req.body._id};
    var updateValues = {
        name: req.body.name,
        link: req.body.link,
        command: req.body.command,
        query_url: req.body.query_url
    };
    Bookmark.findById(updateID, (err, updateBookmark)=>{
        if(err) res.send(err);
        Object.assign(updateBookmark, updateValues).save((err, updateBookmark)=>{
            if(err) res.send(err);
            res.json({success: true, updateBookmark});
        });
    });
}
module.exports = {getBookmarks, postBookmark};