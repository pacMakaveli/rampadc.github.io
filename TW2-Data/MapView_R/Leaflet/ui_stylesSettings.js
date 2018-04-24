/* Styles */
var barbColor = "#828282";
var mapPlayerColor = "#444444";
var miniMapPlayerColor = "#823C0A";

var mapPlayerHighlightStyle = {
    dashArray: '',
    weight: 4,
    fillOpacity: 0.5
};

var miniPlayerHighlightStyle = {
    fillOpacity: 1,
    fillColor: "white"
};

function activityColor(a) {
    if(a.charId == null) return "#828282";
    if(a.away > 7) return "#ff1000";
    if(a.away > 6) return "#ff3700";
    if(a.away > 5) return "#ff5f00";
    if(a.away > 4) return "#ff8700";
    if(a.away > 3) return "#ffaf00";
    if(a.away > 2) return "#ffd700";
    if(a.away > 1) return "#ffff00";
    if(a.away > 0) return "#c0c016";
    if(a.away <= 0) return "#f0f0f0";
}

function villageColor(mapType, playerId) {
    if(playerId == null) return barbColor;
    else {
        if(mapType == "map") return mapPlayerColor;
        else return miniMapPlayerColor;
    }
}

function styleNormalMap(feature) {
    return {
        fillColor: villageColor("map", feature.properties.character_id),
        weight: 0.25,
        color: "green",
        opacity: 1,
        fillOpacity: 1
    };
}

function styleNormalMiniMap(feature) {
    return {
        fillColor: villageColor("mini", feature.properties.character_id),
        weight: 0,
        color: "green",
        opacity: 1,
        fillOpacity: 1
    };
}

function styleByActivityMini(feature) {
    return {
        fillColor: activityColor({away: feature.properties.away, charId: feature.properties.character_id}),
        weight: 0,
        opacity: 1,
        fillOpacity: 1
    };
}

function styleByActivity(feature) {
    return {
        fillColor: activityColor({away: feature.properties.away, charId: feature.properties.character_id}),
        weight: 0.5,
        color: "green",
        opacity: 1,
        fillOpacity: 1
    };
}
