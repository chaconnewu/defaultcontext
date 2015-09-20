var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var http = require('http');
var app = express();
var Q = require('q');

var port = 3000;

BASE_DIR = path.join(__dirname, '../../');
var CLIENT_DIR = path.join(BASE_DIR, '/src/client');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use('/', express.static(CLIENT_DIR));
app.get('/', function(req, res) {
  res.sendFile(path.join(CLIENT_DIR + '/index.html'));
});


app.listen(port);
console.log('The server starts on port ' + port);
