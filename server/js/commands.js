//LISTS ALL AVAILABLE SERVER COMMANDS


//sampleCommand: ! addPlayer playerName lobby
exports.addPlayer = (arguments, topic, mqtt, db, playerList) => {   //expects string:playerName and string:parentTopic, server creates this topic and player sends message to player to subscribe on sucsess, server adds player to list
    let playerName = arguments[1];
    let lobby = arguments[2];
    let newTopic = "scribble/" + lobby + "/" + playerName;

    if (playerList.getLobbyList().includes(lobby)){
        if ( playerList.lobbyList[lobby].addPlayer(playerName) ){
            mqtt.subscribeTopic(newTopic);
            mqtt.send(topic, "subscribe " + playerName + " " + newTopic);
        } else {
            mqtt.send(topic, "error " + lobby + "_full");
        }
    } else {
        mqtt.send(topic, "error unknown_lobby_" + lobby);
    }
};

//sampleCommand: ! startSinglePlayer playerName
exports.startSinglePlayer = (arguments, topic, mqtt, db, playerList) => {   //expects string:playerName, server creates new topic and lobby for playerName and sends a message to the client to join;
    let playerName = arguments[1];
    let lobby = playerName + "_singleplayer";
    let newTopic = "scribble/" + lobby;
    playerList.addLobby(lobby, 1);
    playerList.lobbyList[lobby].addPlayer(playerName);
    mqtt.subscribeTopic(newTopic);
    mqtt.send(topic, "subscribe " + playerName + " " + newTopic);
};

//sampleCommand: ! endSinglePlayer
exports.endSinglePlayer = (arguments, topic, mqtt, db, playerList) => {   //server deletes the singleplayer topic from wich message originated
    mqtt.removeLobby(topic.split("/")[1]);
    mqtt.unsubscribeTopic(topic);
};

//sampleCommand: ! getImage
exports.getImage = (arguments, topic, mqtt, db, playerList) => {  //server sends a random word and the corresponding filename back
    let result = db.getRandomRecord(function(result){
        mqtt.send(topic, "requestImage " + result[0].filename + " " + result[0].word);
    });
};