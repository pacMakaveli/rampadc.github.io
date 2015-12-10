var map = L.map('map', {
    center: [0, 0],
    zoom: 8,
    minZoom: 4.5
});

var geoLayer = L.geoJson().addTo(map);

/* Styles */
var cleanTile = {
    color: "black",
    opacity: 1,
    weight: 0.5,
    fillColor: "white"
};
/* Load data */
$.getJSON("./en15db/db/villagesGeoJSON.json", function(json) {
    geoLayer.addData(json);
    geoLayer.setStyle(cleanTile);
    console.log("Ready");
});

/* Events */
geoLayer.on("click", function(e) {
    console.log(e.latlng);
    console.log(e.id);
    console.log("");
});

geoLayer.on("mouseover", function(e) {
    //console.log(e.latlng);
});
