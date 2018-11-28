//server requires
const express = require('express');
var Mqtt = require('./js/Mqtt.js');
var db = require('./js/db.js');
var path = require('path');

const app = express();
const mqtt = new Mqtt('mqtt://broker.mqttdashboard.com','scribble/lobby', messageHandler);

//responsive requires (server to client communication)
var http = require('http').Server(app);
var io = require('socket.io')(http);
var expressPublicIp = require('express-public-ip');  //needed to make server public

app.enable('trust proxy');
 
app.use(expressPublicIp());

//body parser requires
var bodyParser = require('body-parser');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//server connection related

app.listen(3000,"0.0.0.0");                         //start listening on port 3000

app.get('/', function (req, res) {
    testDbFunctions(req.ip);
    res.send("Hello there your precense was noted " + req.ip);
});

app.get('/returnImage', function (req, res) {
    testDbFunctions(req.ip);
    res.send("Hello there your precense was noted " + req.ip);
});


//middleware

app.use('/', express.static('public'));             //serves static files in public dir

//server test functions

function messageHandler(topic, message){
    console.log('i received a message on ' + topic + ' with content ' + message);
}

var testpackage = {
    description: "hey i just posted a message to the database"
};

function testDbFunctions(ip) {
    db.setTable("test_table");
    db.query('INSERT INTO test_table (description) VALUES ("remote client' + ip + 'connected")');
    //db.insert(testpackage);
    //db.delete(22);
    //db.getRecord(23);
    //db.wipe();
}