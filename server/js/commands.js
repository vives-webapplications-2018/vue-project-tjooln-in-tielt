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