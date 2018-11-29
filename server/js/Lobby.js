// CONTROLS A LOBBY AND CEEPS TRACK OF WHO IS INSIDE THE LOBBY

function Lobby(lobbyName, maxPlayers){      //expects string:lobbyName, int:maxPlayers
    let self = this;
    this.name = lobbyName;
    this.playerList = [];
    this.maxPlayers = maxPlayers;

    this.addPlayer = function(playerName) {     //expects string:playerName, adds to the playerList if not full, returns true if player was able to join else false
        if (self.isFull()){
            self.playerList.push(playerName);
            return true;
        } else {
            return false;
        }
    };
}

module.exports = Lobby;