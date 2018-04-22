const http = require('http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
//config
const config = require('config');

//express
const express = require('express');
const app = express();

const port = config.get('port');

//using ejs for templating
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, ()=> console.log('Example app Listening on port 3000!'));
