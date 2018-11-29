//CEEPS TRACK OF ALL LOBBIES

const Lobby = require('./Lobby.js');

function LobbyList(mainLobbyName, maxTotalPlayers){ //expects string:mainLobbyName and int:maxTotalPlayers
    var self = this;
    this.lobbyList = [];
    this.lobbyList[mainLobbyName] = new Lobby(mainLobbyName, maxTotalPlayers); //initialises main lobby
}

module.exports = LobbyList;