//CEEPS TRACK OF ALL LOBBIES

const Lobby = require('./Lobby.js');

function LobbyList(mainLobbyName, maxTotalPlayers){ //expects string:mainLobbyName and int:maxTotalPlayers
    var self = this;
    this.lobbyList = [];
    this.lobbyList[mainLobbyName] = new Lobby(mainLobbyName, maxTotalPlayers); //initialises main lobby

    this.addLobby = function(lobbyName, maxPlayers) { //expects string:lobbyName, int:maxPlayers adds a Lobby to lobbylist with specified variables
        if (!self.lobbyList.includes(lobbyName)){
            self.lobbyList[lobbyName] = new Lobby(lobbyName, maxPlayers);
        }
    };
}

module.exports = LobbyList;