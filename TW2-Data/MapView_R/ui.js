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
    var str = "<h4>Info</h4>";
    if(props) {
        str += "<b>Village: </b>" + props.name + " (" + props.x + "|" + props.y + ") <br>";
        str += "<b>Points:</b> " + props.points + "<br><br>";

        if(props.character_id == null) {
            str += "<b>Barbarian village</b>";
        } else {
            str += "<b>Player: </b>" + props.character_name + " (" + props.character_id + ")<br>";
            str += "<b>Points:</b> " + props.character_points + "<br>";
            str += "<b>Rank: </b>" + props.rank + "<br>";
            str += "<b>Province: </b>" + props.province_name + "<br>";
            str += "<b>Away: </b>" + String(props.away.toFixed(2)) + " days<br>";
            str += "<b>OBP: </b>" + props.obp + "<br>";
            str += "<b>DBP: </b>" + props.dbp + "<br>";
            str += "<b>Inf: </b>" + props.inf + "<br>";
            str += "<b>Cav: </b>" + props.cav + "<br>";
            str += "<b>Siege: </b>" + props.siege + "<br><br>";

            if(props.tribe_name != null) {
                str += "<b>Tribe:</b> " + props.tribe_name + " (" + props.tribe_tag + ")<br>";
            } else {
                str += "<b>Tribe:</b> N/A<br>";
            }
        }

    } else {
        str += "Hover over a village";
    }

    this._div.innerHTML = str;
};
info.addTo(map);

var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0,1,2,3,4,5,6,7];

    div.innerHTML +=
        '<i style="background:' + activityColor({away:0,charId:null}) + '"></i> ' + 'Barb<br>';
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + activityColor({away:grades[i],charId:1}) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};
legend.addTo(map);

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
        weight: 0.5,
        color: "black",
        opacity: 1,
        fillOpacity: 1
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
        fillOpacity: 0.9
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
