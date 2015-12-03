/**
 * Created by CONG on 25-Nov-15.
 */

var players;
var tribes;

var _dbReady = 0;
localStorage.dbReady = 0;

$.getJSON("./db/en15/Combined_PA.json", function(json) {
    var p = json;
    if(playersList != null) {
        for(var i = 0; i < p.players.length; i++){
            playersList.push({id: i, value: p.players[i].name});
        }
    }

    console.log('Preparing players snapshot');
    players = Defiant.getSnapshot(p);
    console.log('Completed preparing players\' snapshot');

    checkDB_ready();
});

$.getJSON("./db/en15/Tribes.json", function(json) {
    var t = json;
    if(tribesList != null) {
        var tLIdx = 0;
        for(var i = 0; i < t.tribes.length; i += 1) {
            tribesList.push(
                {id: tLIdx++, value: t.tribes[i].name}
            );
        }
    }

    tribes_top10 = t.tribes.slice(0,10);

    var allVillagesInTop10 = 0;
    for(i = 0; i < tribes_top10.length; i++) {
        allVillagesInTop10 += tribes_top10[i].villages;
    }
    for(i = 0; i < tribes_top10.length; i++) {
        tribes_top10[i].dominationRatio = Math.round(tribes_top10[i].villages/allVillagesInTop10*10000)/100;
    }

    console.log('Preparing tribes snapshot');
    tribes = Defiant.getSnapshot(t);
    console.log('Completed preparing tribes\' snapshot');

    checkDB_ready();
});

function checkDB_ready() {
    _dbReady += 1;
    console.log(_dbReady);
    if(_dbReady >= 2) {
        localStorage.dbReady = 1;
    } else {
        localStorage.dbReady = 0;
    }
}

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

function getTop10Tribes() {
    return tribes_top10;
}

function getTribeInfo(tribeName) {
    var a = JSON.search(tribes, "//tribes[name='" +tribeName+ "']" );
    return a[0];
}

function getAllPlayersInTribe(tribeName) {
    return JSON.search(players, "//players[tribeName='"+tribeName+"']");
}

function getTribeNameFromPlayer(playerName) {
    var charProfile = search(playerName);
    return charProfile.tribeName;
}

function getAllPlayersFromTribeWithPlayer(playerName) {
    return getAllPlayersInTribe(getTribeNameFromPlayer(playerName));
}