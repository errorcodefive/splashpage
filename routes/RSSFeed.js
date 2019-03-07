var mongoose = require('mongoose');
var RSSFeed = require('../schemas/rssfeeds');

module.exports = (app) => {
    //POST feed
    //DELETE feed
    //GET feed list
    //GET single feed

    app.post('/api/feeds', (req,res)=>{
        console.log("received POST request /api/feed/add");
        //get name and link
        var name = req.body.name;
        var link = req.body.link;
        //add name, link to db
        var newFeed = new RSSFeed(
            {
                name: name,
                link: link
            }
        );
        newFeed.save((err, newFeed)=>{
            if(err) res.send(err);
            res.json({success: true, data: newFeed});
        });
    });

    app.delete('/api/feeds/:id', (req,res)=>{
        console.log("received DELETE request /api/feeds");
        //get id
        var feedID = req.params.id;
        //delete the feed
        RSSFeed.deleteOne({ _id: feedID}, (err,res)=>{
            if(err) res.send(err);
            res.json({success:true});
        });
    });
    app.get('/api/feeds/', (req, res)=>{
        console.log("received GET request /api/feeds");
        RSSFeed.find({}, (err, feeds)=>{
            if(err) res.send(err);
            res.json({success:true, data: feeds});
        });
    });
    app.get('/api/feeds/:id', (req,res)=>{
        console.log("received GET request /api/feeds/:id");
        var feedID = req.params.id;
        RSSFeed. findById(feedID, (err, feed)=>{
            if(err) res.send(err);
            res.json({success:true, feed});
        });
    });
};