// from https://expressjs.com/en/api.html#app.listen
'use strict';
var express = require('express');
var app = express();
var path = require('path');
var ForecastIo = require('forecastio');
var http = require('http');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));


app.get('/weather.json', function(request, response) {
    var forecastIo = new ForecastIo('b98bd842e0894e2f05cb3bc94579718c');
    forecastIo.forecast('42.402', '-71.126').then(function(data) {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.send(JSON.stringify(data, null, 2));
    });
});

app.get('/sweetboy', function(request, response) {
        response.send('<html><body><img src="https://dl.dropboxusercontent.com/s/r1y7nzwwc1rr5vt/sweet.jpg?dl=0" alt="SweetBoy"></body></html>');
});

// from https://expressjs.com/en/starter/static-files.html
app.use(express.static('/home/ubuntu/Desktop/wwmairs'));

http.createServer().listen(80);


// public IP of the pine is 24.61.43.116
