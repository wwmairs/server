// from https://expressjs.com/en/api.html#app.listen
'use strict';
const weather_pass = 'sweetboy';
var express = require('express');
var app = express();
var path = require('path');
var ForecastIo = require('forecastio');
var http = require('http');
var url = require('url');
var request = require('request');
var flatfile = require('flat-file-db');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

var db = flatfile.sync('/tmp/wwmairs.db');


app.get('/weather.json', function(request, response) {
    if (request.query.pass == weather_pass) {
    var forecastIo = new ForecastIo('b98bd842e0894e2f05cb3bc94579718c');
    forecastIo.forecast('42.402', '-71.126').then(function(data) {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.send(JSON.stringify(data, null, 2));
    });
    }
    else {
        response.send("bad password");
    }
});

app.get('/sunset.json', function(request, response) {
    // curr_time = (new Date).getTime();
    // if (!db.has('sunset_token') ) {
    //     get_token();
    // }
    // token = JSON.parse(db.get('sunset_token'));
    // if (token.time_in + token.exp_sec >= curr_time) {
    //     get_token();
    // }
    get_token();

});

app.get('/sweetboy', function(request, response) {
        response.send('<html><body><img src="https://dl.dropboxusercontent.com/s/r1y7nzwwc1rr5vt/sweet.jpg?dl=0" alt="SweetBoy"></body></html>');
});

// from https://expressjs.com/en/starter/static-files.html
app.use(express.static('/home/ubuntu/Desktop/wwmairs'));

http.createServer(app).listen(80);

function get_token() {
    token = request.post("https://sunburst.sunsetwx.com/v1/login").form({email:"wwmairs@gmail.com", password:"Sweetboy1"});
    console.log(token);

}