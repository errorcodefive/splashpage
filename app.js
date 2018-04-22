const http = require('http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
//config
const config = require('config');

//express
const express = require('express');
const app = express();

const passport = require('passport');
const session = require('express-session');

const port = config.get('port');
const secret = config.get('secret');
//using ejs for templating
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser.json());


//for passport
app.use(session({secret: secret}));
app.use(passport.initialize());
app.use(passport.session());

require('./routes.js')(app, passport);

app.listen(port);
console.log("listening on port: " + port);