var map = L.map('map', {
    center: [0, 0],
    zoom: 8,
    minZoom: 4.5,
    maxZoom: 9
});

var geoLayer = L.geoJson().addTo(map);

/* Styles */
var cleanTile = {
    weight: 0.25,
    color: "black",
    fillColor: "white",
    fillOpacity: 0.2
};

function activityColor(a) {
    if(a > 7) return "#b10026";
    if(a > 6) return "#e31a1c";
    if(a > 5) return "#fc4e2a";
    if(a > 4) return "#fd8d3c";
    if(a > 3) return "#feb24c";
    if(a > 2) return "#fed976";
    if(a > 1) return "#ffeda0";
    if(a > 0) return "#ffffcc";
    if(a <= 0) return "#ffffff";
}

function style(feature) {
    return {
        fillColor: activityColor(feature.properties.awayDays),
        weight: 2,
        opacity: 1,
        color: '#EEEEEE',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
/* Load data */
$.getJSON("./en15db/db/villagesGeoJSON.json", function(json) {
    L.geoJson(json, {
        style: cleanTile,
        onEachFeature: onEachFeature
    }).addTo(map);
    console.log("Ready");
});

/* Events */
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });
}

function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 4,
        color: "#666",
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    var layer = e.target;
    layer.setStyle(cleanTile);
}
