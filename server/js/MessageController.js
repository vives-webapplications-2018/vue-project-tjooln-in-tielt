//HANDLES ALL MQTT TRAFFIC

var Mqtt = require('../js/Mqtt.js');
var commands =require('../js/commands.js');

//exampleMessage ! addLobby lobbyName
function MessageController(brokerURL, initialTopic, commandPrefix, db, playerList){
    var self = this;
    this.commandList = Object.keys(commands);   //gets the names of all exported functions from commands.js
    this.db = db;
    this.playerList = playerList;

    const mqtt = new Mqtt(brokerURL, initialTopic, function(topic, message) {
        console.log('i received a message on ' + topic + ' with content ' + message);
        self.parseMessage(topic, message);
    });
}

module.exports = MessageController;