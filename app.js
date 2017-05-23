// from https://expressjs.com/en/api.html#app.listen
'use strict';
var express = require('express');
var app = express();
var path = require('path');
var ForecastIo = require('forecastio');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

// from https://git.daplie.com/Daplie/greenlock-express
var lex = require('greenlock-express').create({
    server: 'https://acme-v01.api.letsencrypt.org/directory'

,   challenges: {'http-01': require('le-challenge-fs').create({ webrootpath: '/tmp/acme-challenges' }) }
,   store: require('le-store-certbot').create({ webrootPath: '/tmp/acme-challenges' })
,   approveDomains : approveDomains
});

function approveDomains(opts, certs, cb) {
    if (certs) {
        opts.domains = certs.altnames;
    }
    else {
        opts.email = 'wwmairs@gmail.com';
        opts.agreeTos = true;
    }
    cb(null, { options: opts, certs: certs});
}

require('http').createServer(lex.middleware(require('redirect-https')())).listen(80, function () {
    console.log("Listening for ACME http-01 challenges on", this.address());
});

app.get('/weather.json', function(request, response) {
    var forecastIo = new ForecastIo('b98bd842e0894e2f05cb3bc94579718c');
    forecastIo.forecast('42.402', '-71.126').then(function(data) {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.send(JSON.stringify(data, null, 2));
    });
});

// from https://expressjs.com/en/starter/static-files.html
app.use(express.static('/home/ubuntu/Desktop/wwmairs'));

require('https').createServer(lex.httpsOptions, lex.middleware(app)).listen(443, function() {
    console.log("Listening for ACME tls-sni-01 challenges and serve app on", this.address());
});


// public IP of the pine is 24.61.43.116
