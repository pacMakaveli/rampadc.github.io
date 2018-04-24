/* Global variables */
var files, playersDB;

var playersJSON_idx, playersAchJSON_idx;

var pJSON, aJSON;
var precalc_awayDays;
var newDBTime, oldDBTime;
var newDB;

var playersDB_updated;

/* Setup */
function commenceUpdate(newPlayersDBList, pJSON, aJSON, playersDB, newDB, precalc_awayDays) {
    var oldPlayersIdSearch1 = "//players[id='";
    var oldPlayersIdSearch2 = "']";
    var infRecruited1 = "//playersAchievements[character_id=";
    var infRecruited2 = "]/achievements[type='recruited_infantry']";
    var cavRecruited1 = "//playersAchievements[character_id=";
    var cavRecruited2 = "]/achievements[type='recruited_cavalry']";
    var siegeRecruited1 = "//playersAchievements[character_id=";
    var siegeRecruited2 = "]/achievements[type='recruited_siege_weapons']";

    // Create an empty updated DB
    playersDB_updated = {
        players: [],
        time: []
    };

    for(var i = 0; i < newPlayersDBList.length; i++) {
        console.log(newPlayersDBList.length - i - 1);

        var playerOld;
        var playerId = String(newPlayersDBList[i].character_id);
        var beingNobled = 0;

        var pAchSubJSON = JSON.search(aJSON, "//playersAchievements[character_id=" + playerId + "]");
        pAchSubJSON = pAchSubJSON[0];

        pAchSubJSON = Defiant.getSnapshot(pAchSubJSON);

        if(newPlayersDBList[i].character_id == 365582) {
            console.log(i);

        }
        var rInf = JSON.search(pAchSubJSON, "//achievements[type='recruited_infantry']");
        rInf = (rInf[0] != null ? rInf[0].progress : 0);
        var rCav = JSON.search(pAchSubJSON, "//achievements[type='recruited_cavalry']");
        rCav = (rCav[0] != null ? rCav[0].progress : 0);
        var rSiege = JSON.search(pAchSubJSON, "//achievements[type='recruited_siege_weapons']");
        rSiege = (rSiege[0] != null ? rSiege[0].progress : 0);


        //Lord of War (LOW) // done
        var low = JSON.search(pAchSubJSON, "//achievements[type='players_attacked_unique']");
        var lowProgress = (low[0] != null ? low[0].progress : 0);
        low = (low[0] != null ? low[0].level : 0);

        // Gravedigger (GD) // done
        var gd = JSON.search(pAchSubJSON, "//achievements[type='losses']");
        var gdProgress = (gd[0] != null ? gd[0].progress : 0);
        gd = (gd[0] != null ? gd[0].level : 0);

        // Way of Sword (WSW) // done
        var wsw = JSON.search(pAchSubJSON, "//achievements[type='bash_points_offense']");
        var wswProgress = (wsw[0] != null ? wsw[0].progress : 0);
        wsw = (wsw[0] != null ? wsw[0].level : 0);

        // Way of Soldier (WOS) // done
        var wos = JSON.search(pAchSubJSON, "//achievements[type='recruited_infantry']");
        var wosProgress = (wos[0] != null ? wos[0].progress : 0);
        wos = (wos[0] != null ? wos[0].level : 0);

        //  Way of Rider (WOR) // done
        var wor = JSON.search(pAchSubJSON, "//achievements[type='recruited_cavalry']");
        var worProgress = (wor[0] != null ? wor[0].progress : 0);
        wor = (wor[0] != null ? wor[0].level : 0);

        // Hammer and Nail (H&N) or (hnn) // done
        var hnn = JSON.search(pAchSubJSON, "//achievements[type='recruited_siege_weapons']");
        var hnnProgress = (hnn[0] != null ? hnn[0].progress : 0);
        hnn = (hnn[0] != null ? hnn[0].level : 0);

        // Way of Shield (WOD) // done
        var wod = JSON.search(pAchSubJSON, "//achievements[type='bash_points_defense']");
        var wodProgress = (wod[0] != null ? wod[0].progress : 0);
        wod = (wod[0] != null ? wod[0].level : 0);

        // Stolen Goods (SG) // done
        var sg = JSON.search(pAchSubJSON, "//achievements[type='loot']");
        var sgProgress = (sg[0] != null ? sg[0].progress : 0);
        sg = (sg[0] != null ? sg[0].level : 0);

        var awayDays = 0;
        if(newDB != 1) {
            playerOld = JSON.search(playersDB, oldPlayersIdSearch1 + playerId + oldPlayersIdSearch2);

            if(playerOld.length > 0) {
                playerOld = playerOld[0];
                awayDays = playerOld.away;

                if(
                    (rInf == playerOld.inf) &&
                    (rCav == playerOld.cav) &&
                    (rSiege == playerOld.siege) &&
                    (newPlayersDBList[i].points == playerOld.points) &&
                    (newPlayersDBList[i].bash_points_off == playerOld.offBash)
                ) {
                    awayDays += precalc_awayDays;
                } else {
                    if(newPlayersDBList[i].points < playerOld.points) {
                        beingNobled = 1;
                    }
                    awayDays = 0;
                }
            }
        }

        if(newPlayersDBList[i].tribe_name == null) {
            newPlayersDBList[i].tribe_name = "";
        }

        if(newPlayersDBList[i].tribe_tag == null) {
            newPlayersDBList[i].tribeTag = "";
        }

        var updatedPlayer =  {
            id: newPlayersDBList[i].character_id,
            name: newPlayersDBList[i].character_name,
            rank: newPlayersDBList[i].rank,
            points: newPlayersDBList[i].points,
            away: awayDays,
            offBash: newPlayersDBList[i].bash_points_off,
            defBash: newPlayersDBList[i].bash_points_def,
            achievementsPoints: newPlayersDBList[i].achievement_points,
            inf: rInf,
            cav: rCav,
            siege: rSiege,
            villages: newPlayersDBList[i].villages,
            tribeName: newPlayersDBList[i].tribe_name,
            tribeTag: newPlayersDBList[i].tribe_tag,
            tribePoints: newPlayersDBList[i].tribe_points,
            low: low,
            lowProgress: lowProgress,
            gd: gd,
            gdProgress: gdProgress,
            wsw: wsw,
            wswProgress: wswProgress,
            wos: wos,
            wosProgress: wosProgress,
            wor: wor,
            worProgress: worProgress,
            hnn: hnn,
            hnnProgress: hnnProgress,
            wod: wod,
            wodProgess: wodProgress,
            sg: sg,
            sgProgress: sgProgress,
            beingNobled: beingNobled
        };

        //END updatePlayer(i) in v1
        playersDB_updated.players.push(updatedPlayer);
    } //END for loop
    playersDB_updated.time = newDBTime.getTime();
    console.log('Completed update');
    var playerDB_updatedStr = JSON.stringify(playersDB_updated);
    console.save(playersDB_updated, "Combined_PA.json");
    //download("Combined_PA.json", playerDB_updatedStr);
}

/* Load in database */
$.getJSON("Output/Combined_PA.json", function(result) {
    playersDB = result;

    oldDBTime = new Date(playersDB.time);
    console.log('Current database updated time: ' + oldDBTime.toLocaleString());
    document.getElementById('currentDB_updateTime').innerHTML = 'Current database updated time: ' + oldDBTime.toLocaleString();

    if(playersDB.players.length == 0) {
        newDB = 1;
        precalc_awayDays = 0;
    } else {
        console.log('Creating snapshot for old Players DB');
        newDB = 0;
        playersDB = Defiant.getSnapshot(playersDB);
    }
    console.log('Ready for input');
});


/* UI events */
inputBtn.addEventListener('change', onFilesSelected);
function onFilesSelected(event) {
    var playersJsonRegex = /(.+)_(?=players\b)/;
    var playersAchJsonRegex = /(.+)_(?=playersAch\b)/;

    files = event.target.files; // FileList object

    newDBTime = 0;
    for(var i = 0, f; f = files[i]; i++) {
        var fileName = f.name;
        var playerFile = playersJsonRegex.exec(fileName);
        var playerAchFile = playersAchJsonRegex.exec(fileName);
        console.log(fileName);
        if(playerFile != null) {
            console.log('Player file found');
            playersJSON_idx = i;
            newDBTime = (parseInt(playerFile[1]) >= newDBTime ? parseInt(playerFile[1]) : playersDB.time);
        } else if(playerAchFile != null) {
            console.log('Player Ach file found');
            playersAchJSON_idx = i;
            newDBTime = (parseInt(playerAchFile[1]) >= newDBTime ? parseInt(playerAchFile[1]) : playersDB.time);
        }
    }
    console.log(newDBTime);
    newDBTime = new Date(newDBTime);
    console.log('New DB time: ' + newDBTime.toLocaleString());
    if(newDBTime.getTime() > oldDBTime.getTime()) {
        precalc_awayDays = (newDBTime.getTime()-oldDBTime.getTime())/1000/60/60/24;
        processInputFiles();
    } else {
        alert('Older database file loaded. Build stopped.');
    }

}

function processInputFiles() {
    var frP = new FileReader();
    var frA = new FileReader();
    var jsonsReady = 0;
    var jsonsReadyTmr;
    var newPlayersDBList = [];

    frP.onload = function() {
        pJSON = JSON.parse(frP.result);
        newPlayersDBList = pJSON.players;
        console.log('Creating snapshot of loaded Players JSON...');
        pJSON = Defiant.getSnapshot(pJSON);
        jsonsReady |= 1 << 0;
    };
    frA.onload = function() {
        aJSON = JSON.parse(frA.result);
        console.log('Creating snapshot of loaded Players\' Achievements JSON...');
        aJSON = Defiant.getSnapshot(aJSON);
        jsonsReady |= 1 << 1;
    };

    if(playersJSON_idx != null) {
        frP.readAsText(files[playersJSON_idx]);
    }
    if(playersAchJSON_idx != null) {
        frA.readAsText(files[playersAchJSON_idx]);
    }

    jsonsReadyTmr = setInterval(function() {
        if(jsonsReady == 3) {
            clearInterval(jsonsReadyTmr);

            // START UPDATE HERE
            commenceUpdate(newPlayersDBList, pJSON, aJSON, playersDB, newDB, precalc_awayDays);
        }
    }, 100);
}


// HELPER FUNCTIONS
(function(console) {

        console.save = function(data, filename) {

            if (!data) {
                console.error('Console.save: No data')
                return;
            }

            if (!filename)
                filename = 'console.json'

            if (typeof data === "object") {
                data = JSON.stringify(data, undefined, 4)
            }

            var blob = new Blob([data],{
                    type: 'text/json'
                })

                ,
                e = document.createEvent('MouseEvents')

                ,
                a = document.createElement('a');

            a.download = filename;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
            e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null );
            a.dispatchEvent(e)
        }
    }
)(console);

// HELPER FUNCTION
function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}
