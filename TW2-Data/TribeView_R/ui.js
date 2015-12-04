
var dv1;
var dv2;
var playersTbl_sort = {property: "name", direction: "asc", dataType: "string"};

function startPreloader() {
    webix.message("Preparing databases...");
}
function startGUI(p, t, t10, uT) {
    webix.message("Ready");
    var colorSwash = ['#004B67','#6784B3','#2C4E86','#64AB23','#A6CBF0',
        '#DF8500','#68468F','#9FD96B','#53BA83','#4E463C'];
    var searchBoxSuggestions = p.concat(t);
    var top10TribesUI = {
        view: "accordion",
        multi: true,
        rows: [
            {
                header: "Top 10 Tribes Overview",
                body: {
                    cols: [
                        {
                            view: "chart",
                            type: "pie",
                            label: "#tag#",
                            value: "#villages#",
                            tooltip: {template: "#name# (#tag#): #dominationRatio#% (#villages#)"},
                            color: function(obj) {
                                return colorSwash[obj.rank-1];
                            },
                            data: t10
                        }
                    ]
                }
            }
        ]
    };

    var searchBoxUI = {
        view: "search",
        id: "searchBox",
        placeholder: "Search for Tribe by tribe name or player name",
        suggest: searchBoxSuggestions
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
                    {id: "name", header: "Name", fillspace:true, sort:"string"},
                    {id: "id", header: "Id"},
                    {id: "points", header: "Points", sort:"int"},
                    {id: "away", header: "Away (days)", sort: "int", template:function(obj) {return obj.away.toFixed(2)}},
                    {id: "rank", header: "Rank", sort:"int"},
                    {id: "offBash", header: "OBP", sort: "int"},
                    {id: "defBash", header: "DBP", sort: "int"},
                    {id: "inf", header: "Infantry", sort: "int"},
                    {id: "cav", header: "Cavalry", sort: "int"},
                    {id: "siege", header: "Siege", sort: "int"}
                ],
                select: "row"
            }
        ]
    };

    var lastUpdatedTime = {
        view: 'label',
        label: 'Last updated time: ' + uT
    };

    webix.ui({
        type: "space",
        rows: [
            top10TribesUI,
            searchBoxUI,
            dataViewsUI,
            lastUpdatedTime
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
}

function onPlayersTblDblClick(id, e, node) {
    console.log(id);
}
function onPlayersTblSort(property, direction, dataType) {
    playersTbl_sort = {property: property, direction: direction, dataType: dataType};
}
function onSearchIconClick(event) {
    ctrl_handleSearchBox()
}

function onSearchKeyPress(event) {
    if(event == 13) {
        ctrl_handleSearchBox();
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