// NPM START TO START SERVER //

//server requires
const express = require('express');
const fs = require('./js/FsManipulator.js');
const LobbyList = require('./js/LobbyList.js');
const MessageController = require('./js/MessageController.js');
const db = require('./js/db.js');
const path = require('path');

const app = express();

//responsive requires (server to client communication)
let http = require('http').Server(app);
let io = require('socket.io')(http);
let expressPublicIp = require('express-public-ip');  //needed to make server public
let lobbyList = new LobbyList('lobby', 100);
let messageController = new MessageController('ws://iot.eclipse.org/ws', 'scribble/lobby', "!", db, lobbyList);

app.enable('trust proxy');
 
app.use(expressPublicIp());

//body parser requires
let bodyParser = require('body-parser');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
setupDb();

//server connection related

app.listen(3000,"0.0.0.0");                         //start listening on port 3000

//example request: http://localhost:3000/getImage?fileName=auto.jpg
app.get('/getimage', function (req, res) {
    res.sendFile(__dirname + "/public/images/" + req.query.fileName);
});


//middleware

app.use('/', express.static('public'));             //serves static files in public dir

//server test functions

let testpackage = {
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

function  setupDb() {
    fs.getFolderContent("./public/images", function(err, images){
        db.setTable("images");
        db.wipe();
        db.resetIdCounter( function(){
            for (let index in images) {
                db.insert({
                    filename: images[index],
                    word: images[index].split(".")[0]
                });
            }
        });
    });
}