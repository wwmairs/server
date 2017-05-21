// from https://expressjs.com/en/api.html#app.listen
var express = require('express');
var http = require('http');
var app = express();
var DarkSky = require('dark-sky');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

// from https://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get('/bio.html', function(request, response) {
  forecast = new DarkSky('b98bd842e0894e2f05cb3bc94579718c');
  console.log(forecast);
});

http.createServer(app).listen(80);
// https.createServer(options, app).listen(443);


// public IP of the pine is 24.61.43.116
