//react
var React =require('react');
var ReactDOM=require('react-dom');
var path = require('path');
var http = require('http');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//config
var config = require('config');

//express
var express = require('express');
var router = express.Router();
var app = express();
var ejs = require('ejs');

var passport = require('passport');
var session = require('express-session');

var port = config.get('port');
var secret = config.get('secret');

var mongoUser = config.get('mongodb').user;
var mongoPassword=config.get('mongodb').password;

mongoose.connect('mongodb://'+mongoUser+':'+mongoPassword+'@ds151070.mlab.com:51070/startpage-test')

require('../config/passport')(passport);


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//login page


//using ejs for templating
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use('/', router);

module.exports=app;

//for passport
app.use(session({secret: secret,
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/routes.js')(app, passport);