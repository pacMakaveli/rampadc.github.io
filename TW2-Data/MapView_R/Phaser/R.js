var R = {};
var R_baseURL = "./MapView_R/img/tiles/";
R.tiles = {
    // tileIdentifier: pathToTile
    barb299:    R_baseURL + "barb/btown01.png",
    barb999:    R_baseURL + "barb/btown02.png",
    barb2999:   R_baseURL + "barb/btown03.png",
    barb3999:   R_baseURL + "barb/btown04.png",
    barb10999:  R_baseURL + "barb/btown05.png",
    barb11000:  R_baseURL + "barb/btown06.png",
    barbFort:   R_baseURL + "barb/bfortress.png",

    town299:    R_baseURL + "town/town01.png",
    town999:    R_baseURL + "town/town02.png",
    town2999:   R_baseURL + "town/town03.png",
    town3999:   R_baseURL + "town/town04.png",
    town10999:  R_baseURL + "town/town05.png",
    town11000:  R_baseURL + "town/town06.png",
    townFort:   R_baseURL + "town/fortress.png",

    // empty and trees are array so they can be randomly selected or by index
    empty: [
        R_baseURL + "empty/desert-0.png",
        R_baseURL + "empty/desert-1.png",
        R_baseURL + "empty/desert-2.png",
        R_baseURL + "empty/desert-3.png",
        R_baseURL + "empty/desert-4.png",
        R_baseURL + "empty/desert-5.png",

        R_baseURL + "empty/gras-0.png",
        R_baseURL + "empty/gras-1.png",
        R_baseURL + "empty/gras-2.png",
        R_baseURL + "empty/gras-3.png",
        R_baseURL + "empty/gras-4.png",
        R_baseURL + "empty/gras-5.png",

        R_baseURL + "empty/waste-0.png",
        R_baseURL + "empty/waste-1.png",
        R_baseURL + "empty/waste-2.png",
        R_baseURL + "empty/waste-3.png",
        R_baseURL + "empty/waste-4.png",
        R_baseURL + "empty/waste-5.png"
    ]
};

R.tileHeight = 98;
R.tileWidth = 136;