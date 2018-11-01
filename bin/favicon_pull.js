#! /app/bin/node
var config = require('config');
var s3 = require('s3');

function pull_favicon() {
  var favicon_link = "http://icons.duckduckgo.com/ip2/"

  if (process.env.NODE_ENV="development"){
    var aws_key = config.aws.key;
    var aws_secret = config.aws.secret;
    var aws_bucket = config.aws.bucket;
    var aws_region = config.aws.region;
  } else{
    var aws_key = process.env.AWS_ACCESS_KEY;
    var aws_secret = process.env.AWS_SECRET_KEY;
    var aws_bucket = process.env.S3_BUCKET_NAME;
    var aws_region = process.env.S3_REGION;
  }
  console.log("Favicon pull link is:", favicon_link);
  console.log(aws_key, aws_bucket, aws_region, aws_secret);


}
pull_favicon();
process.exit();