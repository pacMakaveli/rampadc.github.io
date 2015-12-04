startPreloader();

var dbReady = setInterval(function() {
    if(parseInt(localStorage.dbReady) == 1) {
        localStorage.dbReady = 0;
        console.log('Ready');
        clearInterval(dbReady);

        startGUI(playersList, tribesList, tribes_top10, getDBLastUpdatedTime());
        attachEvents();
    }
}, 100);

function ctrl_handleSearchBox() {
    var searchTerm = $$('searchBox').getValue();
    searchTerm = searchTerm.trim();

    var tribe = getTribeInfo(searchTerm);
    if(tribe == null) {
        searchTerm = getTribeNameFromPlayer(searchTerm);
        tribe = getTribeInfo(searchTerm);

        if(tribe == null) {
            // Player does not belong in tribe
            var player = search($$('searchBox').getValue());
            ui_clearTribeInfo();
            ui_displayPlayersInfo(player);
            return;
        }
    }

    var players = getAllPlayersInTribe(searchTerm);

    ui_displayTribeInfo(tribe);
    ui_displayPlayersInfo(players);
}