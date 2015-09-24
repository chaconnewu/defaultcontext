var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var http = require('http');
var app = express();
var mysql = require('mysql');

var conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'po',
    port: '3306',
    socketPath: '/tmp/mysql.sock'
});

conn.connect(function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log('Connection established');
});

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

app.post('/record', function(req, res) {
    var userRes = req.body.settings.map(function(item) {
        return parseInt(item);
    });
    userRes.push(req.body.startTime);
    userRes.push(req.body.endTime);
    console.log(userRes);

    var fields = ['calendar', 'camera', 'contacts', 'location', 'microphone', 'phone', 'sms', 'sensors', 'start_time', 'end_time'];
    var data = {};
    fields.forEach(function(field, idx) {
        data[field] = userRes[idx];
    });
    data['user'] = req.body.userID;
    console.log(data);
    var query = "insert into defaultcontext set ? ";
    conn.query(query, data, function(err) {
        if (err) throw err;
    })
    res.end('{"success" : "Post Successfully", "status" : 200}');
});

app.listen(port);
console.log('The server starts on port ' + port);
