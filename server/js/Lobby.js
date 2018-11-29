// CONTROLS A LOBBY AND CEEPS TRACK OF WHO IS INSIDE THE LOBBY

function Lobby(lobbyName, maxPlayers){      //expects string:lobbyName, int:maxPlayers
    let self = this;
    this.name = lobbyName;
    this.playerList = [];
    this.maxPlayers = maxPlayers;
}

module.exports = Lobby;