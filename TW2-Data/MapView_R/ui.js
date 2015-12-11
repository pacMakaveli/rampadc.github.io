var map = L.map('map', {
    center: [0, 0],
    zoom: 8,
    minZoom: 4.5,
    maxZoom: 9,
    backgroundColor: "#59610A"
});

var miniMap = L.map('miniMap', {
    center: [0, 0],
    zoom: 5,
    minZoom: 4,
    maxZoom: 5.5,
    zoomControl: false,
    backgroundColor: "#59610A"
});

var mapGeoJson, miniMapGeoJson;

/* Load data */
$.getJSON("./en15db/db/villagesGeoJSON.json", function(json) {
    mapGeoJson = L.geoJson(json, {
        style: styleByActivity,
        onEachFeature: onEachFeature
    }).addTo(map);

    miniMapGeoJson = L.geoJson(json, {
        style: styleByActivityMini,
        onEachFeature: onEachFeature
    }).addTo(miniMap);

    map.addEventListener("onmousedown", syncCenters);
    console.log("Ready");
});

/* Events */
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
    });
}

function  syncCenters(e) {
    console.log('Mouse down');
}

function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 4,
        dashArray: '',
        fillOpacity: 0.9
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    mapGeoJson.resetStyle(e.target);
    info.update();
}

/* Styles */
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
    if(a.away <= 0) return "#444444";
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
