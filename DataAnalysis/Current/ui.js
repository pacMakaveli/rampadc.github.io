/**
 * Created by CONG on 25-Nov-15.
 */

// Components
var tabView = {
    view: "tabview",
    cells: [
        {
            header: "Players",
            body: {
                view: "datatable",
                columns: [
                    {id: "name", header: "Name"},
                    {id: "id", header: "Id"},
                    {id: "points", header: "Points"},
                    {id: "rank", header: "Rank"},
                    {id: "offBash", header: "Off BP"},
                    {id: "defBash", header: "Def BP"},
                    {id: "inf", header: "Inf"},
                    {id: "cav", header: "Cav"},
                    {id: "siege", header: "Siege"}
                ]
            }
        },
        {
            header: "Tribes",
            body: {
                view: "datatable",
                columns: [
                    {id: "name", header: "Name"},
                    {id: "tag", header: "Tag"},
                    {id: "tribe_id", header: "Id"},
                    {id: "points", header: "Points"},
                    {id: "rank", header: "Rank"}
                ]
            }
        }
    ]
};

var detailedView = {
    width: 460,
    rows: [
        {
            view: "datatable",
            columns: [
                {id: "name", header: "Name"},
                {id: "id", header: "Id"},
                {id: "points", header: "Points"},
                {id: "x", header: "X"},
                {id: "y", header: "Y"}
            ]
        },
        {
            view: "button",
            id: "exportVillages_btn",
            value: "Export Villages"
        }
    ]
};

// UI
webix.ui({
    rows: [
        {
            view: "template",
            type: "header",
            template: "Data Analysis Tool for Tribal Wars 2 (EN15)"
        },
        {
            cols: [
                tabView,
                {view: "resizer"},
                detailedView
            ]
        }
    ]
});