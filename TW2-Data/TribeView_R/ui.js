/**
 * Created by CONG on 03-Dec-15.
 */

var playersTbl_sort = {property: "name", direction: "asc", dataType: "string"};

function startPreloader() {
    webix.message("Preparing databases...");
}
function startGUI(p, t, t10) {
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
                    {id: "points", header: "Points", sort:"int"},
                    {id: "away", header: "Away (days)", sort: "int", template:function(obj) {return obj.away.toFixed(2)}},
                    {id: "rank", header: "Rank", sort:"int"},
                    {id: "offBash", header: "OBP", sort: "int"},
                    {id: "defBash", header: "DBP", sort: "int"},
                    {id: "inf", header: "Infantry", sort: "int"},
                    {id: "cav", header: "Cavalry", sort: "int"},
                    {id: "siege", header: "Siege", sort: "int"}
                ],
                onContext: {}
            }
        ]
    };

    webix.ui({
        type: "space",
        rows: [
            top10TribesUI,
            searchBoxUI,
            dataViewsUI
        ]
    });

    // Context menu
    webix.ui({
        view: "contextmenu",
        data: [
            "Export villages"
        ]
    });
}

function attachEvents() {
    $$('searchBox').attachEvent("onSearchIconClick", onSearchIconClick);
    $$('searchBox').attachEvent("onKeyPress", onSearchKeyPress);
    $$('playersTbl').attachEvent("onAfterSort", onPlayersTblSort);
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

function ui_displayPlayersInfo(players) {
    $$('playersTbl').clearAll();
    for(var i = 0; i < players.length; i++) {
        $$('playersTbl').add(players[i]);
    }
    $$('playersTbl').sort(playersTbl_sort.property, playersTbl_sort.direction, playersTbl_sort.dataType)
}