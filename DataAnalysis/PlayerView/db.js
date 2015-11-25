/**
 * Created by CONG on 25-Nov-15.
 */

var players, achievements, worker;
var fetched = 0;

localStorage.dbReady = 0;
$.getJSON("../EN15/Players.json", function(json) {
    players = json;
    fetched |= (1 << 0);
});

$.getJSON("../EN15/PlayersAchievements.json", function(json) {
    achievements = json;
    fetched |= (1 << 1);
});

var startupTimer = setInterval(function() {
    if(fetched == 3) {
        clearInterval(startupTimer);
        for(var i = 0; i < players.players.length; i++) {
            playersList.push({id: i, value: players.players[i].character_name});
        }
        localStorage.dbReady = 1;
    }
}, 100);

///////////////////////////////////////////////////////////////////////////////////
// SEARCH FUNCTION
///////////////////////////////////////////////////////////////////////////////////

var infRecruited1 = "//playersAchievements[character_id=";
var infRecruited2 = "]/achievements[type='recruited_infantry']";
var cavRecruited1 = "//playersAchievements[character_id=";
var cavRecruited2 = "]/achievements[type='recruited_cavalry']";
var siegeRecruited1 = "//playersAchievements[character_id=";
var siegeRecruited2 = "]/achievements[type='recruited_siege_weapons']";
var getCharacterByName1 = "//players[character_name='";
var getCharacterByName2 = "']";

function search(name) {
    var playerStat = JSON.search(players, getCharacterByName1 + name + getCharacterByName2);
    var playerId = String(playerStat[0].character_id);
    var rInf = JSON.search(achievements, infRecruited1 + playerId + infRecruited2);
    var rCav = JSON.search(achievements, cavRecruited1 + playerId + cavRecruited2);
    var rSiege = JSON.search(achievements, siegeRecruited1 + playerId + siegeRecruited2);

    var playerDB = {
        id: playerStat[0].character_id,
        name: playerStat[0].character_name,
        rank: playerStat[0].rank,
        points: playerStat[0].points,
        offBash: playerStat[0].bash_points_off,
        defBash: playerStat[0].bash_points_def,
        inf: (rInf.length > 0 ? rInf[0].progress : 0),
        cav: (rCav.length > 0 ? rCav[0].progress : 0),
        siege: (rSiege.length > 0 ? rSiege[0].progress : 0),
        villages: playerStat[0].villages
    };
    return playerDB;
}