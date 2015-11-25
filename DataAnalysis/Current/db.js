/**
 * Created by CONG on 25-Nov-15.
 */

var tribes, players, villages, achievements;
var infRecruited1 = "//playersAchievements[character_id=";
var infRecruited2 = "]/achievements[type='recruited_infantry']";
var cavRecruited1 = "//playersAchievements[character_id=";
var cavRecruited2 = "]/achievements[type='recruited_cavalry']";
var siegeRecruited1 = "//playersAchievements[character_id=";
var siegeRecruited2 = "]/achievements[type='recruited_siege_weapons']";

var fetched = 0;

localStorage.dbReady = 0;

if(debug == 1) {
    console.log("Database will be recompiled");
    $.getJSON("../EN15/Tribes.json", function(json) {
        tribes = json;
        fetched |= (1 << 0);
    });

    $.getJSON("../EN15/Players.json", function(json) {
        players = json;
        fetched |= (1 << 1);
    });

    $.getJSON("../EN15/PlayersAchievements.json", function(json) {
        achievements = json;
        fetched |= (1 << 2);
    });

    $.getJSON("../EN15/Map.json", function(json) {
        villages = json;
        fetched |= (1 << 3);
    });

    var startupTimer = setInterval(function() {
        if(fetched == 15) {
            clearInterval(startupTimer);
            console.log("All JSONs fetched. Preparing database.");
            prepareDatabases();
        }
    }, 100);
} else {
    console.log("Load compiled database");
}

function prepareDatabases() {
    // Start web worker
}

function preparePlayersDatabases() {
    /**
     * Columns: name, id, points, rank, offBash, defBash, inf, cav, siege, villages[{name, id, points, x, y}]
     */
    for(var i = 0; i < players.players.length; i++) {
        var p = players.players[i];
        var pId = String(players.players[424].character_id);

        // find in achievements for recruited infantry, cavalry and siege
        var rInf = JSON.search(achievements, infRecruited1 + pId + infRecruited2);
        var rCav = JSON.search(achievements, cavRecruited1 + pId + cavRecruited2);
        var rSiege = JSON.search(achievements, siegeRecruited1 + pId + siegeRecruited2);

        playersDB.push({
            name: p.character_name,
            id: p.character_id,
            points: p.points,
            rank: p.rank,
            offBash: p.bash_points_off,
            defBash: p.bash_points_def,
            inf: rInf.progress,
            cav: rCav.progress,
            siege: rSiege.progress
        });

        console.log("# of players compiled: " + String(i) + "/" + String(players.players.length));
    }

    console.log("Complete");
}