/**
 * Created by CONG on 25-Nov-15.
 */

var results, player;

var controlTimer = setInterval(function() {
    if(parseInt(localStorage.dbReady) == 1) {
        clearInterval(controlTimer);
        startGUI();

        $$('exportBtn').disable();
        $$('searchBox').attachEvent("onSearchIconClick", onSearchIconClick);
        $$('searchBox').attachEvent("onKeyPress", onSearchKeyPress);
        $$('exportBtn').attachEvent("onItemClick", onExportBtnClicked);
    }
}, 100);

function onSearchIconClick(event) {
    ctrl_handleSearchBox()
}

function onSearchKeyPress(event) {
    if(event == 13) {
        ctrl_handleSearchBox();
    }
}

function onExportBtnClicked(event) {
    var str = "";
    for(var i = 0; i < results.villages.length; i++) {
        str += "(" + results.villages[i].village_name + ")";
        str += "[" + results.villages[i].village_x + "|" + results.villages[i].village_y + "]";
        str += "{" + results.villages[i].village_id + "}";
        str += "\r\n";
    }
    download(results.name + "_villages.txt", str);
}

function ctrl_handleSearchBox() {
    $$('exportBtn').disable();

    player = $$('searchBox').getValue();
    player = player.trim();
    $$('searchBox').setValue('Searching...');
    setTimeout(ctrl_search,200);
}

function ctrl_search() {
    results = search(player);
    $$('searchBox').setValue('');
    $$('exportBtn').enable();

    $$('playerStatTbl').clearAll();
    $$('playerVillagesTbl').clearAll();

    console.log(results);
    $$('playerStatTbl').add(results);
    for(var i = 0; i < results.villages.length; i++) {
        $$('playerVillagesTbl').add(results.villages[i]);
    }
}

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