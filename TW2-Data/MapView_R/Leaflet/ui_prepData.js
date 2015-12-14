/* Load data */
//info.update(null, "Preparing map");

$.getJSON("./en15db/db/villagesGeo.json", function(json) {
    mapGeoJson = L.geoJson(json, {
        style: styleNormalMap,
        onEachFeature: onEachMapFeature
    }).addTo(map);

    miniMapGeoJson = L.geoJson(json, {
        style: styleNormalMiniMap,
        onEachFeature: onEachMiniMapFeature
    }).addTo(miniMap);

    //info.update(null, "Ready to use");
});
