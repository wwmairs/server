// from https://expressjs.com/en/api.html#app.listen
var express = require('express');
var http = require('http');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

// from https://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

http.createServer(app).listen(80);
// https.createServer(options, app).listen(443);