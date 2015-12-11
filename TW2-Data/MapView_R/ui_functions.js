/**
 * Created by CONG on 11-Dec-15.
 */

function ui_hideBarbs(geojson) {
    geojson.eachLayer(function(layer) {
        var props = layer.feature.properties;
        if(props.character_id == null) {
            console.log(layer);
            geojson.removeLayer(layer.leaflet_id);
        }
    });
}