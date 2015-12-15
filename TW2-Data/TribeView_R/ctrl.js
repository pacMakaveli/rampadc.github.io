startPreloader();

var dbReady = setInterval(function() {
    if(db_isReady()) {
        console.log('Ready');
        clearInterval(dbReady);

        startGUI(db_getSuggestionLists(), db_getTop10Tribes(), getDBLastUpdatedTime());
        attachEvents();
    }
}, 100);

function ctrl_handleSearchBox(s) {
    var searchTerm = $$('searchBox').getValue();
    searchTerm = searchTerm.trim();

    var tribe, players;

    if(s == "tribe") {
        tribe = getTribeInfo(searchTerm);
        ui_displayTribeInfo(tribe);

        players = getAllPlayersInTribe(searchTerm);
    } else if(s == "player") {
        searchTerm = getTribeNameFromPlayer(searchTerm);
        tribe = getTribeInfo(searchTerm);

        if(tribe == null) {
            // Player does not belong in tribe
            players = search($$('searchBox').getValue());
            ui_clearTribeInfo();
        } else {
            players = getAllPlayersInTribe(searchTerm);
            ui_displayTribeInfo(tribe);
        }

    } else if(s == "province") {
        ui_clearTribeInfo();
        players = getPlayersFromProvince(searchTerm);
    } else if(s == "area") {
        ui_clearTribeInfo();
        var searchParamsRegex = /([0-9]{1,3})\|([0-9]{1,3})\s*,\s*([0-9]+)/;
        var searchParams = searchParamsRegex.exec(searchTerm);

        var center = {x: parseInt(searchParams[1]), y: parseInt(searchParams[2])};
        var radius = parseInt(searchParams[3]);

        var topLeftCorner = {x: center.x - radius, y: center.y - radius};
        var side = radius * 2;
        players = getPlayersByArea(topLeftCorner.x, topLeftCorner.y, side, side);
        console.log(players);
    }

    for(var i = 0; i < players.length; i++) {
        players[i].numVillages = players[i].villages.length;
        players[i].ppv = 0;
        for(var j = 0; j < players[i].villages.length; j++) {
            players[i].ppv += players[i].villages[j].points;
        }
        players[i].ppv = Math.round(players[i].ppv / players[i].numVillages);
    }
    ui_displayPlayersInfo(players);
}