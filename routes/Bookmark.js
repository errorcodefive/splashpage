var mongoose = require('mongoose');
var Bookmark = require('../schemas/bookmarks');

function getBookmarks(req,res){
    let query = Bookmark.find({});
    query.exec((err,bookmarks)=>{
        if(err) res.send(err);
        res.json({success: true, data: bookmarks});
    });
}

module.exports = {getBookmarks};