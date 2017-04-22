var express = require('express');

var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

// from https://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))