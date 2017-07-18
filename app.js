// from https://expressjs.com/en/api.html#app.listen
'use strict';
const weather_pass = 'sweetboy';
var express = require('express');
var app = express();
var path = require('path');
var ForecastIo = require('forecastio');
var http = require('http');
var url = require('url');
var flatfile = require('flat-file-db');
var SunsetWx = require('node-sunsetwx');

var sunsetwx = new SunsetWx({
    email: 'wwmairs@gmail.com',
    password: 'Sweetboy1'
    });



var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
app.set('view engine', 'pug');

var db = flatfile.sync('/tmp/wwmairs.db');


app.get('/', function (req, res) {
    res.render('index');
});

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

// db architecture
// 'sun_info' = {
//     'date' : <Date.getDate()>
//     'sunrise' : <sunrise_info>
//     'sunset' : <sunset_info>
// }

app.get('/sun.json', function(request, response) {
    var curr_date = (new Date).getDate();
    if (!db.has('sun_info') ||
        (db.get('sun_info').date != curr_date)) {
            updateSunInfo();
    }
    response.send(db.get('sun_info'));

});

app.get('/sweetboy', function(request, response) {
        response.send('<html><body><img src="https://dl.dropboxusercontent.com/s/r1y7nzwwc1rr5vt/sweet.jpg?dl=0" alt="SweetBoy" style="width: 80%; display: block; margin: auto;"></body></html>');
});

// from https://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// changed for testing
http.createServer(app).listen(3000);

function updateSunInfo() {
    console.log('fetching new sun data');

    var new_data = {'date' : (new Date).getDate(),
                    'sunrise' : 'initialize_me',
                    'sunset' : 'initialize_me'};
    sunsetwx.quality({
        coords: '-71.126,42.402',
        type: 'sunrise',
        radius: '1',
        limit: '1'}, function (err, httpResponse, body) {
            new_data.sunrise = body;
            db.put('sun_info', new_data);
        });
    sunsetwx.quality({
        coords: '-71.126,42.402',
        type: 'sunset',
        radius: '1',
        limit: '1'}, function (err, httpResponse, body) {
            new_data.sunset = body;
            db.put('sun_info', new_data);
        });

}
