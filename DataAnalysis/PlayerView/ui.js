/**
 * Created by CONG on 25-Nov-15.
 */

// UI

function startGUI() {
    webix.ui({
        rows: [
            {
                cols: [
                    {
                        view: "template",
                        type: "header",
                        template: "Player Data Viewer for Tribal Wars 2 (EN15)"
                    },
                    {
                        view: "search",
                        id: "searchBox",
                        placeholder: "Search for player",
                        suggest: playersList,
                        width: 400
                    }
                ]
            },
            {
                view: "datatable",
                id: "playerStatTbl",
                columns: [
                    {id: "name", header: "Name"},
                    {id: "id", header: "Id"},
                    {id: "points", header: "Points"},
                    {id: "rank", header: "Rank"},
                    {id: "offBash", header: "Off BP"},
                    {id: "defBash", header: "Def BP"},
                    {id: "inf", header: "Infantry"},
                    {id: "cav", header: "Cavalry"},
                    {id: "siege", header: "Siege"}
                ],
                autowidth: true,
                height: 100
            },
            {view: "resizer"},
            {
                view: "datatable",
                id: "playerVillagesTbl",
                columns: [
                    {id: "village_name", header: "Name"},
                    {id: "village_id", header: "Id"},
                    {id: "points", header: "Points"},
                    {id: "village_x", header: "X"},
                    {id: "village_y", header: "Y"}
                ],
                autowidth: true
            },
            {
                view: "button",
                id: "exportBtn",
                label: "Export villages"
            }
        ]
    });
}