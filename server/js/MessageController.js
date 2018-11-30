//HANDLES ALL MQTT TRAFFIC


//exampleMessage ! addLobby lobbyName
function MessageController(brokerURL, initialTopic, commandPrefix, db, playerList){
    var self = this;
    this.commandList = Object.keys(commands);   //gets the names of all exported functions from commands.js
    this.db = db;
    this.playerList = playerList;
}

module.exports = MessageController;