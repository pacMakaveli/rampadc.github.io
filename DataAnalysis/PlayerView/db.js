/**
 * Created by CONG on 25-Nov-15.
 */

var players;

localStorage.dbReady = 0;
$.getJSON("./db/Combined_PA.json", function(json) {
    players = json;
    playersList = [];

    for(var i = 0; i < players.players.length; i++) {
        playersList.push({id: i, value: players.players[i].name});
    }
    console.log('Preparing snapshot');
    players = Defiant.getSnapshot(json);
    console.log(players);
    console.log('Ready');
    localStorage.dbReady = 1;
});

///////////////////////////////////////////////////////////////////////////////////
// SEARCH FUNCTION
///////////////////////////////////////////////////////////////////////////////////

var getCharacterByName1 = "//players[name='";
var getCharacterByName2 = "']";

function search(name) {
    var player = JSON.search(players, getCharacterByName1 + name + getCharacterByName2);
    return player[0];
}