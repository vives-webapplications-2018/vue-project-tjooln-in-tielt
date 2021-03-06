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

    this.removePlayer = function(playerName) {      //expects string playerName, removes player from playerList if not null, returns true on sucsessfull deletion else false 
        if (self.playerList.includes(playerName)){
            self.playerList.remove(self.playerList.indexOf(playerName));
            return true;
        } else {
            return false;
        }
    };

    this.isFull = function() {      //returns true if maxPlayers has been reached else returns false
        return (self.playerList.length + 1 < maxPlayers);
    };
}

module.exports = Lobby;