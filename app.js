// from https://expressjs.com/en/api.html#app.listen
var express = require('express');
var http = require('http');
var app = express();
var path = require('path');
var ForecastIo = require('forecastio');

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

// from https://expressjs.com/en/starter/static-files.html
app.use(express.static('/home/ubuntu/Desktop/wwmairs'));


http.createServer(app).listen(80);
//https.createServer(options, app).listen(443);


// public IP of the pine is 24.61.43.116
