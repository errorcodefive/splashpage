var http = require('http');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//config
var config = require('config');

//express
var express = require('express');
var app = express();

var passport = require('passport');
var session = require('express-session');

var port = config.get('port');
var secret = config.get('secret');

var mongoUser = config.get('mongodb').user;
var mongoPassword=config.get('mongodb').password;

mongoose.connect('mongodb://'+mongoUser+':'+mongoPassword+'@ds151070.mlab.com:51070/startpage-test')

require('./config/passport')(passport);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//using ejs for templating
app.set('view engine', 'ejs');

//for passport
app.use(session({secret: secret,
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


require('./routes.js')(app, passport);

app.listen(port);
console.log("listening on port: " + port);