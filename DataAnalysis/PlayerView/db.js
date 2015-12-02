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
    console.log('Ready');
    localStorage.dbReady = 1;
});

///////////////////////////////////////////////////////////////////////////////////
// SEARCH FUNCTION
///////////////////////////////////////////////////////////////////////////////////

var getCharacterByName1 = "//players[name='";
var getCharacterByName2 = "']";

function search(charName) {
    var player = JSON.search(players, getCharacterByName1 + charName + getCharacterByName2);
    return player[0];
}

function getVillages(x, y, dx, dy) {
    var boundX = x + dx + 1;
    var boundY = y + dy + 1;

    return JSON.search(players, '//players/villages[village_x >= ' +
        String(x) +
        ' and not(village_x > ' +
        String(boundX) +
        ') and village_y >= ' +
        String(y) +
        ' and not(village_y > ' +
        String(boundY) +
        ')]');
}