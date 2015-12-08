
var dv1;
var dv2;
var playersTbl_sort = {property: "name", direction: "asc", dataType: "string"};
var searchSuggestionsLists;

var searchBy = "tribe";

function startPreloader() {
    webix.message("Preparing databases...");
}
function startGUI(lists, t10, uT) {
    webix.message("Ready");
    var colorSwash = ['#004B67','#6784B3','#2C4E86','#64AB23','#A6CBF0',
        '#DF8500','#68468F','#9FD96B','#53BA83','#4E463C'];
    searchSuggestionsLists = lists;
    var top10TribesUI = {
        view: "accordion",
        multi: true,
        rows: [
            {
                header: "Top 10 Tribes Overview",
                body: {
                    view: "chart",
                    type: "pie",
                    value: "#villages#",
                    tooltip: {template: "#name# (#tag#): #dominationRatio#% (#villages# villages)"},
                    color: function (obj) {
                        return colorSwash[obj.rank - 1];
                    },
                    legend: {
                        width: 350,
                        valign: "middle",
                        template: "#name#, (#tag#): #dominationRatio#%"
                    },
                    data: t10,
                    on: {
                        onItemClick: function(id, e, node) {
                            var clickedTribe = this.getItem(id);
                            $$('searchBox').define("value", clickedTribe.name);
                            $$('searchBox').refresh();

                            ctrl_handleSearchBox("tribe");
                        }
                    }
                }
            }
        ]
    };

    var searchUI = {
        cols: [
            {
                view: "radio",
                id: "searchOption",
                value: 1,
                options: [
                    {id: 1, value: "Tribe"},
                    {id: 2, value: "Player"},
                    {id: 3, value: "Province"}
                ],
                width: 300
            },
            {
                view: "search",
                id: "searchBox",
                placeholder: "Enter a name",
                suggest: searchSuggestionsLists.tribesList
            }
        ]
    };

    var dataViewsUI = {
        rows: [
            {
                view: 'datatable',
                id: 'tribeStatTbl',
                columns: [
                    {id: "name", header: "Name", fillspace:true},
                    {id: "tag", header: "Tag"},
                    {id: "points", header: "Points"},
                    {id: "rank", header: "Rank"},
                    {id: "villages", header: "Villages"}
                ],
                height: 100
            }, {
                view: 'datatable',
                id: 'playersTbl',
                columns: [
                    {id: "name", header: ["Name", {id: "playerNameFilter", content: "textFilter"}], fillspace:true, sort:"string"},
                    {id: "id", header: "Id"},
                    {id: "points", header: ["Points", {content: "numberFilter", placeholder: ">=10000"}], sort:"int"},
                    {id: "away", header: "Away (days)", sort: "int", template:function(obj) {return obj.away.toFixed(2)}},
                    {id: "rank", header: "Rank", sort:"int"},
                    {id: "offBash", header: "OBP", sort: "int"},
                    {id: "defBash", header: "DBP", sort: "int"},
                    {id: "inf", header: ["Inf", {content: "numberFilter", placeholder: ">=10000"}], sort: "int"},
                    {id: "cav", header: ["Cav", {content: "numberFilter", placeholder: ">=500"}], sort: "int"},
                    {id: "siege", header: ["Siege", {content: "numberFilter", placeholder: ">=100"}], sort: "int"}
                ],
                select: "row"
            }
        ]
    };

    var footer = {
        cols: [
            {
                view: 'label',
                label: 'Last local updated time: ' + uT,
                width: 500
            }, {
                view: 'button',
                id: 'exportPlayersNamesBtn',
                label: 'Get displayed player\'s names',
                on: {
                    onItemClick: function() {
                        var bbNames = "";
                        $$('playersTbl').eachRow(function(row) {
                            var rowData = $$('playersTbl').getItem(row);
                            bbNames += ui_getBB('player', rowData.name, rowData.id);
                            bbNames += '\n';
                        });
                        download("displayedPlayers.txt", bbNames);
                    }
                }
            }, {
                view: 'button',
                id: 'exportAllPlayersVillagesBtn',
                label: 'Get displayed player\'s villages',
                on: {
                    onItemClick: function() {
                        var combined = "";
                        $$('playersTbl').eachRow(function(row) {
                            var rowData = $$('playersTbl').getItem(row);
                            var playerBB = ui_getBB('player', rowData.name, rowData.id);

                            combined += playerBB + '\n';
                            for(var i = 0; i < rowData.villages.length; i++) {
                                var rowVillages = ui_getBB('village', rowData.villages[i].village_name, rowData.villages[i].village_id);
                                combined += "   " + rowVillages + '\n';
                            }
                            combined += '\n';

                        });
                        download("displayedPlayers&Villages.txt", combined);
                    }
                }
            }
        ]

    };

    webix.ui({
        type: "space",
        rows: [
            top10TribesUI,
            searchUI,
            dataViewsUI,
            footer
        ]
    });

// Context menu
    webix.ui({
        view: "contextmenu",
        id: "playersTbl_cm",
        data: [
            "Export villages"
        ],
        on: {
            onItemClick: function(id, context) {
                row = this.getContext().id;
                dtItem = $$("playersTbl").getItem(row);
                exportVillages(dtItem);
            }
        }
    }).attachTo($$("playersTbl"));
}

function attachEvents() {
    $$('searchBox').attachEvent("onSearchIconClick", onSearchIconClick);
    $$('searchBox').attachEvent("onKeyPress", onSearchKeyPress);
    $$('playersTbl').attachEvent("onAfterSort", onPlayersTblSort);
    $$('playersTbl').attachEvent("onItemDblClick", onPlayersTblDblClick);
    $$('searchOption').attachEvent("onChange", onSearchOptionChanged);
}

function onSearchOptionChanged(val) {
    if(val == 1) {
        searchBy = "tribe";
        $$('searchBox').define("suggest", searchSuggestionsLists.tribesList);
    } else if(val == 2) {
        searchBy = "player";
        $$('searchBox').define("suggest", searchSuggestionsLists.playersList);
    } else if(val == 3) {
        searchBy = "province";
        $$('searchBox').define("suggest", searchSuggestionsLists.provincesList);
    }
    $$('searchBox').refresh();
}

function onPlayersTblDblClick(id, e, node) {
    var row = $$('playersTbl').getItem(id);

    window.open("http://www.tw2-tools.com/en15/player/" + String(row.id));
}
function onPlayersTblSort(property, direction, dataType) {
    playersTbl_sort = {property: property, direction: direction, dataType: dataType};
}
function onSearchIconClick(event) {
    ctrl_handleSearchBox(searchBy)
}

function onSearchKeyPress(event) {
    if(event == 13) {
        ctrl_handleSearchBox(searchBy);
    }
}

function ui_displayTribeInfo(tribe) {
    $$('tribeStatTbl').clearAll();
    $$('tribeStatTbl').add(tribe);
}

function ui_clearTribeInfo() {
    $$('tribeStatTbl').clearAll();
}

function ui_displayPlayersInfo(players) {
    $$('playersTbl').clearAll();

    if(Array.isArray(players)) {
        for(var i = 0; i < players.length; i++) {
            $$('playersTbl').add(players[i]);
        }
    } else {
        console.log(players);
        $$('playersTbl').add(players);
    }

    $$('playersTbl').sort(playersTbl_sort.property, playersTbl_sort.direction, playersTbl_sort.dataType)
}

function ui_getBB(type, name, id) {
    var code = "";
    if(type == 'village') {
        code = '<a data-bb-type="village" data-bb-value="' + id + '" data-bb-content="' + name + '" class="img-link icon-20x20-village btn btn-orange padded ng-scope" rich-text-internal-link="true" ng-click="action()">' + name + '<\/a>';
    } else if(type == 'player') {
        code = '<a data-bb-type="player" data-bb-value="' + id + '" data-bb-content="' + name + '" class="img-link icon-20x20-character btn btn-orange padded ng-scope" rich-text-internal-link="true" ng-click="action()">' + name + "<\/a>";
    }

    return code;

}
function exportVillages(results) {
    var str = "";
    for(var i = 0; i < results.villages.length; i++) {
        str += "(" + results.villages[i].village_name + ")";
        str += "[" + results.villages[i].village_x + "|" + results.villages[i].village_y + "]";
        str += "{" + results.villages[i].village_id + "}";
        str += "\r\n";
    }
    download(results.name + "_villages.txt", str);
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