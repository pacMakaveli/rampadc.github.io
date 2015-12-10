var map = L.map('map', {
    center: [0, 0],
    zoom: 8,
    minZoom: 4.5,
    maxZoom: 9,
    backgroundColor: "#59610A"
});

var geoJSON;

/* Controls */
var info = L.control();
info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // Creates a div with class 'info'
    this.update();
    return this._div;
};
info.update = function(props) {
    // update control based on feature properties passed
    this._div.innerHTML = "<h4>Info</h4>";
    if(props) {

    } else {
        this._div.innerHTML += "Hover over a village";
    }
};
info.addTo(map);

/* Styles */
function activityColor(a) {
    if(a.away > 7) return "#b10026";
    if(a.away > 6) return "#e31a1c";
    if(a.away > 5) return "#fc4e2a";
    if(a.away > 4) return "#fd8d3c";
    if(a.away > 3) return "#feb24c";
    if(a.away > 2) return "#fed976";
    if(a.away > 1) return "#ffeda0";
    if(a.away > 0) return "#ffffcc";
    if(a.away <= 0) {
        if(a.charId == null) {
            return "#888888";
        }
        return "#ffffff";
    }
}

function styleByActivity(feature) {
    return {
        fillColor: activityColor({away: feature.properties.away, charId: feature.properties.character_id}),
        weight: 0.25,
        color: "black",
        opacity: 1,
        fillOpacity: 0.8
    };
}
/* Load data */
$.getJSON("./en15db/db/villagesGeoJSON.json", function(json) {
    geoJSON = L.geoJson(json, {
        style: styleByActivity,
        onEachFeature: onEachFeature
    }).addTo(map);
    console.log("Ready");
});

/* Events */
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: openPlayerDefailInfo
    });
}

function openPlayerDefailInfo() {

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

    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geoJSON.resetStyle(e.target);
    info.update();
}
