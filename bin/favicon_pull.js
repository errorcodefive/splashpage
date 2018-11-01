#! /app/bin/node
var config = require('config');
var s3 = require('s3');
var mongoose = require('mongoose');
var Bookmark = require('../schemas/bookmarks');

function pull_favicon() {
  var favicon_link = "http://icons.duckduckgo.com/ip2/"

  if (process.env.NODE_ENV="development"){
    var aws_key = config.aws.key;
    var aws_secret = config.aws.secret;
    var aws_bucket = config.aws.bucket;
    var aws_region = config.aws.region;

    var mongoDbName = config.mongoDB.db;
    var mongoDbUser = config.mongoDB.user;
    var mongoDbPassword = config.mongoDB.pw;
    var mongoDbURL = config.mongoDB.url;
  } else{
    var aws_key = process.env.AWS_ACCESS_KEY;
    var aws_secret = process.env.AWS_SECRET_KEY;
    var aws_bucket = process.env.S3_BUCKET_NAME;
    var aws_region = process.env.S3_REGION;

    var mongoDbName = process.env.MONGODB_DB;
    var mongoDbUser = process.env.MONGODB_USER;
    var mongoDbPassword = process.env.MONGODB_PW;
    var mongoDbURL = process.env.MONGODB_URL;
  }

  console.log("Favicon pull link is:", favicon_link);
  console.log(aws_key, aws_bucket, aws_region, aws_secret);

  var mongoConnect = 'mongodb://'+mongoDbUser+':'+mongoDbPassword+mongoDbURL+mongoDbName;
  console.log("Connecting to mongoDB with:" + mongoConnect);
  mongoose.connect(mongoConnect, { useNewUrlParser: true }).then(
    ()=>{
      console.log("Mongoose connected successfully to: " + mongoConnect)
      Bookmark.find({}, (err,res)=>{
        if(err) console.log(err);
        console.log(JSON.stringify(res));
      });
    },
    err=>{
      console.log('ERROR: Mongoose did not connect.', err);
    }
  );


  //for each bookmark in the table


  //see if a s3_id exists
  // if s3_id exists -> check if file on s3 exists -> do nothing
  // if s3_id exists -> no file on s3 exists -> pull + update s3_id
  // if s3_id does not exist -> pull + update s3_id



}
pull_favicon();
//process.exit();