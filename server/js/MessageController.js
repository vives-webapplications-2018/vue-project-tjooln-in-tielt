//HANDLES ALL MQTT TRAFFIC

const Mqtt = require('../js/Mqtt.js');
const commands =require('../js/commands.js');

//exampleMessage ! addLobby lobbyName
function MessageController(brokerURL, initialTopic, commandPrefix, db, playerList){
    let self = this;
    this.commandList = Object.keys(commands);   //gets the names of all exported functions from commands.js
    this.db = db;
    this.playerList = playerList;

    const mqtt = new Mqtt(brokerURL, initialTopic, function(topic, message) {
        console.log('i received a message on ' + topic + ' with content ' + message);
        self.parseMessage(topic, message);
    });

    this.parseMessage = function(topic, message) {                      //expects string:topic and string:message, searches for the right command to execute
        let splitInformation = message.split(" ");
        
        if (splitInformation.length >= 2) {                             //if message has at least 2 words (command and prefix)
            if (splitInformation[0] == commandPrefix){                  //if first word is prefix
                splitInformation.shift();                               //remove prefix
                if ( self.commandList.includes(splitInformation[0]) ){  //if command exists
                    commands[splitInformation[0]](splitInformation, topic, mqtt, self.db, self.playerList); //call command and give argument list, topic and the messageController
                }
            }
        }
    };
}

module.exports = MessageController;