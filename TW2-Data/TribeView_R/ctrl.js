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
    } else {
    }

    ui_displayPlayersInfo(players);
}