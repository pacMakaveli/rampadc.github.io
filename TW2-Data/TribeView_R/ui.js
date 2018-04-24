var playersTbl_sort = {property: "name", direction: "asc", dataType: "string"};
var searchSuggestionsLists;
var playersTbl_nameColWidth = null;

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
                            $$('playersTbl').refresh();
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
                    {id: 3, value: "Province"},
                    {id: 4, value: "Area"}
                ],
                width: 350
            },
            {
                view: "search",
                id: "searchBox",
                placeholder: "Enter a name",
                suggest: searchSuggestionsLists.tribesList
            },
            {
                view: "checkbox",
                id: "jzFeature",
                label: "Jehzir Feature",
                labelWidth: 100,
                width: 120,
                value: false
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
                visibleBatch: 1,
                columns: [
                    {id: "name", header: ["Name", {id: "playerNameFilter", content: "textFilter"}], sort:"string", fillspace: true, minWidth: 170, tooltip: ""},
                    {id: "id", header: "Id", tooltip: ""},
                    {id: "points", header: ["Points", {content: "numberFilter", placeholder: ">=10000"}], sort:"int", tooltip: ""},
                    {id: "numVillages", header: ["Villages", {content:"numberFilter", placeholder: ">=20"}], sort:"int", tooltip: ""},
                    {id: "ppv", header: ["PPV", {content: "numberFilter", placeholder: ">=3000"}], sort: "int", tooltip: ""},
                    {id: "tribeTag", header: ["Tribe Tag", {content: "textFilter"}], sort: "string", tooltip: ""},

                    {id: "away", header: "Away (days)", sort: "int", batch: 1, template:function(obj) {return obj.away.toFixed(2)}, tooltip: ""},
                    {id: "beingNobled", header: ["Attacked",{content: "numberFilter", placeholder: "0"}], batch: 1,  sort:"int", tooltip: ""},
                    {id: "rank", header: "Rank", sort:"int", batch: 1, tooltip: ""},
                    {id: "offBash", header: "OBP", sort: "int", batch: 1, tooltip: ""},
                    {id: "defBash", header: "DBP", sort: "int", batch: 1, tooltip: ""},
                    {id: "inf", header: ["Inf", {content: "numberFilter", placeholder: ">=10000"}], sort: "int", batch: 1, tooltip: ""},
                    {id: "cav", header: ["Cav", {content: "numberFilter", placeholder: ">=500"}], sort: "int", batch: 1, tooltip: ""},
                    {id: "siege", header: ["Siege", {content: "numberFilter", placeholder: ">=100"}], sort: "int", batch: 1, tooltip: ""},

                    {id: "low", header: ["LOW", {content: "numberFilter", placeholder: ">=1"}], sort: "int", batch: 2, tooltip: "#lowProgress#"},
                    {id: "gd", header: ["GD", {content: "numberFilter", placeholder: ">=1"}], sort: "int", batch: 2, tooltip: "#gdProgress#"},
                    {id: "wsw", header: ["WSW", {content: "numberFilter", placeholder: ">=1"}], sort: "int", batch: 2, tooltip: "#wswProgress#"},
                    {id: "wos", header: ["WOS", {content: "numberFilter", placeholder: ">=1"}], sort: "int", batch: 2, tooltip: "#wosProgress#"},
                    {id: "wor", header: ["WOR", {content: "numberFilter", placeholder: ">=1"}], sort: "int", batch: 2, tooltip: "#worProgress#"},
                    {id: "hnn", header: ["H&N", {content: "numberFilter", placeholder: ">=1"}], sort: "int", batch: 2, tooltip: "#hnnProgress#"},
                    {id: "wod", header: ["WOD", {content: "numberFilter", placeholder: ">=1"}], sort: "int", batch: 2, tooltip: "#wodProgress#"},
                    {id: "sg", header: ["SG", {content: "numberFilter", placeholder: ">=1"}], sort: "int", batch: 2, tooltip: "#sgProgress#"}
                ],
                resizeColumn: true,
                tooltip: true,
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
                var row = this.getContext().id;
                var dtItem = $$("playersTbl").getItem(row);
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
    $$('playersTbl').attachEvent("onColumnResize", onNameColumnResized);
    $$('searchOption').attachEvent("onChange", onSearchOptionChanged);
    $$('jzFeature').attachEvent("onChange", onJZFeatureChanged);
}

function onNameColumnResized(id) {
    if(id == "name") {
        console.log("Width resized");
        playersTbl_nameColWidth = $$('playersTbl').getColumnConfig(id).width;
        console.log(playersTbl_nameColWidth);
    }
}

function onJZFeatureChanged() {
    var jzEnabled = $$('jzFeature').getValue();
    if(jzEnabled) {
        $$('playersTbl').showColumnBatch(2);
        $$('playersTbl').define("tooltip", true);
    } else {
        $$('playersTbl').showColumnBatch(1);
        $$('playersTbl').define("tooltip", false);
    }
}

function onSearchOptionChanged(val) {
    if(val == 1) {
        searchBy = "tribe";
        $$('searchBox').define('placeholder', "Enter a name");
        $$('searchBox').define("suggest", searchSuggestionsLists.tribesList);
    } else if(val == 2) {
        searchBy = "player";
        $$('searchBox').define('placeholder', "Enter a name");
        $$('searchBox').define("suggest", searchSuggestionsLists.playersList);
    } else if(val == 3) {
        searchBy = "province";
        $$('searchBox').define('placeholder', "Enter a name");
        $$('searchBox').define("suggest", searchSuggestionsLists.provincesList);
    } else if(val == 4) {
        searchBy = "area";
        $$('searchBox').define('placeholder', "xxx|yyy, radius");
        $$('searchBox').define("suggest", []);
    }
    $$('searchBox').refresh();
}

function onPlayersTblDblClick(id, e, node) {
    var row = $$('playersTbl').getItem(id);

    window.open("http://www.tw2-tools.com/en15/player/" + String(row.id));
}
function onPlayersTblSort(property, direction, dataType) {
    playersTbl_sort = {property: property, direction: direction, dataType: dataType};
    // jump back to top
    var topRowId = $$('playersTbl').getIdByIndex(0);
    $$('playersTbl').showItem(topRowId);
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

    $$('playersTbl').sort(playersTbl_sort.property, playersTbl_sort.direction, playersTbl_sort.dataType);
    if(playersTbl_nameColWidth != null) {
        $$('playersTbl').setColumnWidth("name", playersTbl_nameColWidth);
        $$('playersTbl').refresh();
    }
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

function ui_removeTribeTagColumn() {

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