!function(e) {
    e.save = function(o, t) {
        if (!o)
            return void e.error("Console.save: No data");
        t || (t = "console.json"),
        "object" == typeof o && (o = JSON.stringify(o, void 0, 4));
        var n = new Blob([o],{
            type: "text/json"
        })
          
        , i = document.createEvent("MouseEvents")
          
        , r = document.createElement("a");
        r.download = t,
        r.href = window.URL.createObjectURL(n),
        r.dataset.downloadurl = ["text/json", r.download, r.href].join(":"),
        i.initMouseEvent("click", !0, !1, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null ),
        r.dispatchEvent(i)
    }
}(console),
Array.prototype.unique = function() {
    var o = {}, i, l = this.length, r = [];
    for(i=0; i<l;i+=1) o[this[i]] = this[i];
    for(i in o) r.push(o[i]);
    return r;
};

/* Universal Setup */
var ss = window.injector.get("socketService");
var rp = window.injector.get("routeProvider");

/* Get villages setup */
var villages = [];
var d = new Date();
var dStr = d.getTime().toString();
var mapSaveStr = dStr + '.json';
var playersSaveStr = dStr + '_players.json';
var pAchSaveStr = dStr + '_playersAch.json';

var coords = [];
var playerIds = [];
var playersDB = [];
var playersAchievements = [];

for (var x = 0; x < 1000; x += 50) {
    for (var y = 0; y < 1000; y += 50) {
        coords.push({
            x: x,
            y: y
        });
    }
}

/* Functions used in this script */
function get100Tribes() {
	var d = new Date();
	var dStr = d.getTime().toString();
	ss.emit(rp.RANKING_TRIBE, {area_type: 'world', offset: 0, count: 1000, order_by: 'rank', order_dir: 0, area_id: 0}, function(data) {
		var d = new Date();
        var savStr = d.getTime().toString() + '_tribes.json';
		console.save({tribes: data.ranking},savStr);
	});
}

function getAreaData(xCoor, yCoor) {
    ss.emit(rp.MAP_GETVILLAGES, {
        width: 50,
        height: 50,
        x: xCoor,
        y: yCoor
    }, 
    function(data) {
        for (var p = 0; p < villages.length; p++) {
            if (villages[p].character_id != null ) {
                playerIds.push(villages[p].character_id);
            }
        }
        
        villages = villages.concat(data.villages);
        
        i++;
        console.log('i:', i, '/400, x:', xCoor, ', y:', yCoor);
        
        if (i == coords.length) {
//             villages = villages.unique();
            console.log('Removing duplicates from list of player ids');
            playerIds = playerIds.unique();
            console.log('done');
            
            console.log('Getting players');
            getPlayers();
            
            console.save({
                villages: villages
            }, dStr + '.json');
        
            console.save(playerIds, 'currentPlayerIds.json');
        } else {
            getAreaData(coords[i].x, coords[i].y);
        }
    });
}

function getPlayersDB(command, bulk, idx) {
    var lastRound = 0;
    
    var count = playerIds.length;
    var cmd = [];
    var params = [];
    
    while (idx + bulk > playerIds.length) {
        bulk -= 1;
        lastRound = 1;
    }
    
    for (var i = 0; i < bulk; i++) {
        cmd.push(command);
    }
    
    for (j = 0; j < bulk; j++) {
        params.push({
            character_id: playerIds[idx + j]
        });
    }
    
    ss.emitMultiple(cmd, params, function(d) {
        for (var k = 0; k < d.length; k++) {
            playersDB.push(d[k]);
        }
        idx += bulk;
        
        if (lastRound == 1) {
            console.log(String(playersDB.length) + '/' + String(playerIds.length));
            console.log('Done with Players, onto Achievements');
            var d = new Date();
            var playersSaveStr = d.getTime().toString() + '_players.json';
            console.save({
                players: playersDB
            }, playersSaveStr);

            getPlayersAchievements();
        } else {
            console.log(String(playersDB.length) + '/' + String(playerIds.length));
            getPlayersDB(command, bulk, idx);
        }
    
    }
    );
}

function getPlayersAchDB(command, bulk, idx) {
    var lastRound = 0;
    
    var count = playerIds.length;
    var cmd = [];
    var params = [];
    
    while (idx + bulk > playerIds.length) {
        bulk -= 1;
        lastRound = 1;
    }
    
    for (var i = 0; i < bulk; i++) {
        cmd.push(command);
    }
    
    for (j = 0; j < bulk; j++) {
        params.push({
            character_id: playerIds[idx + j]
        });
    }
    
    ss.emitMultiple(cmd, params, function(d) {
        for (var k = 0; k < d.length; k++) {
            playersAchievements.push(d[k]);
        }
        idx += bulk;
        
        if (lastRound == 1) {
            console.log(String(playersAchievements.length) + '/' + String(playerIds.length));
            var d = new Date();
            var pAchSaveStr = d.getTime().toString() + '_playersAch.json';
            console.save({
                playersAchievements: playersAchievements
            }, pAchSaveStr);
        
        } else {
            console.log(String(playersAchievements.length) + '/' + String(playerIds.length));
            getPlayersAchDB(command, bulk, idx);
        }
    
    }
    );
}

function setPlayerIds(ids) {
    if(ids != null) {
        playerIds = ids;
    }
}

/* Run */
var i, playersDB, playersAchievements;

get100Tribes();

setPlayerIds(null);
i = 0; getAreaData(0, 0);

function getPlayers() {
    playersDB = []
    getPlayersDB(rp.CHAR_GET_PROFILE, 150, 0);
}

function getPlayersAchievements() {
    playersAchievements = [];
    getPlayersAchDB(rp.ACHIEVEMENT_GET_CHAR_ACHIEVEMENTS, 150, 0);
}
