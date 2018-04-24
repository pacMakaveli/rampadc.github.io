map.addEventListener("move", onMapMove);
map.addEventListener("mousedown", onMapMouseDown);
map.addEventListener("mouseup", onMapMouseUp);

miniMap.addEventListener("move", onMiniMapMove);
miniMap.addEventListener("mousedown", onMiniMapMouseDown);
miniMap.addEventListener("mouseup", onMiniMapMouseUp);

var mapMouseDown = false;
var miniMouseDown = false;
/* Events */
function onMapMouseDown() {
    mapMouseDown = true;
}

function onMapMouseUp() {
    mapMouseDown = false;
}

function onMiniMapMouseDown() {
    miniMouseDown = true;
}

function onMiniMapMouseUp() {
    miniMouseDown = false;
}

function onMapMove() {
    if(mapMouseDown) miniMap.panTo(map.getCenter());
}

function onMiniMapMove() {
    if(miniMouseDown) map.panTo(miniMap.getCenter());
}

function onEachMapFeature(feature, layer) {
    layer.on({
        mouseover: highlightMapFeature,
        mouseout: resetMapHighlight
    });
}

function dualHighlight(e) {
    var layer = e.target;
    layer.setStyle(mapPlayerHighlightStyle);

    var props = layer.feature.properties;
    mapGeoJson.eachLayer(function(l) {
        if(l.feature.properties.character_id != null) {
            if(l.feature.properties.character_id == props.character_id) {
                l.setStyle(mapPlayerHighlightStyle);
            }
        }
    });

    miniMapGeoJson.eachLayer(function(l) {
        if(l.feature.properties.character_id != null) {
            if(l.feature.properties.character_id == props.character_id) {
                l.setStyle(miniPlayerHighlightStyle);
            }
        }
    });
}

function dualUnhighlight(e) {
    mapGeoJson.resetStyle(e.target);

    var props = e.target.feature.properties;
    mapGeoJson.eachLayer(function(l) {
        if(l.feature.properties.character_name == props.character_name) {
            mapGeoJson.resetStyle(l);
        }
    });
    miniMapGeoJson.eachLayer(function(l) {
        if(l.feature.properties.character_id != null) {
            miniMapGeoJson.resetStyle(l);
        }
    });
}

function highlightMapFeature(e) {
    dualHighlight(e);

    var layer = e.target;
    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }

    //info.update(layer.feature.properties, null);
}

function resetMapHighlight(e) {
    dualUnhighlight(e);

    //info.update();
}

function onEachMiniMapFeature(feature, layer) {
    layer.on({
        mouseover: highlightMiniFeature,
        mouseout: resetMiniHighlight
    });
}

function highlightMiniFeature(e) {
    var layer = e.target;
    layer.setStyle({
        dashArray: '2',
        fillOpacity: 0.9
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }

    //info.update(layer.feature.properties, null);
}

function resetMiniHighlight(e) {
    miniMapGeoJson.resetStyle(e.target);
    //info.update();
}