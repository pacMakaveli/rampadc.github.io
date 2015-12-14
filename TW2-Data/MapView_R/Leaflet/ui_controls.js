///**
// * Created by CONG on 11-Dec-15.
// */
//
///* Controls */
//var info = L.control();
//info.onAdd = function(map) {
//    this._div = L.DomUtil.create('div', 'info'); // Creates a div with class 'info'
//    this.update();
//    return this._div;
//};
//info.update = function(props, statusText) {
//    var str = "";
//    if(statusText != null) {
//        str = "<h4>Status</h4>";
//        str += statusText + "<br>";
//    } else {
//        // update control based on feature properties passed
//        str = "<h4>Info</h4>";
//        if(props) {
//            str += "<b>Village: </b>" + props.name + " (" + props.x + "|" + props.y + ") <br>";
//            str += "<b>Points:</b> " + props.points + "<br><br>";
//
//            if(props.character_id == null) {
//                str += "<b>Barbarian village</b>";
//            } else {
//                str += "<b>Player: </b>" + props.character_name + " (" + props.character_id + ")<br>";
//                str += "<b>Points:</b> " + props.character_points + "<br>";
//                str += "<b>Rank: </b>" + props.rank + "<br>";
//                str += "<b>Province: </b>" + props.province_name + "<br>";
//                str += "<b>Away: </b>" + String(props.away.toFixed(2)) + " days<br>";
//                str += "<b>OBP: </b>" + props.obp + "<br>";
//                str += "<b>DBP: </b>" + props.dbp + "<br>";
//                str += "<b>Inf: </b>" + props.inf + "<br>";
//                str += "<b>Cav: </b>" + props.cav + "<br>";
//                str += "<b>Siege: </b>" + props.siege + "<br><br>";
//
//                if(props.tribe_name != null) {
//                    str += "<b>Tribe:</b> " + props.tribe_name + " (" + props.tribe_tag + ")<br>";
//                } else {
//                    str += "<b>Tribe:</b> N/A<br>";
//                }
//            }
//
//        } else {
//            str += "Hover over a village";
//        }
//    }
//
//    this._div.innerHTML = str;
//};
////info.addTo(map);
//
//var activityLegend = L.control({position: 'bottomleft'});
//activityLegend.onAdd = function (map) {
//
//    var div = L.DomUtil.create('div', 'info legend'),
//        grades = [0,1,2,3,4,5,6,7];
//
//    div.innerHTML +=
//        '<i style="background:' + activityColor({away:0,charId:null}) + '"></i> ' + 'Barb<br>';
//    // loop through our density intervals and generate a label with a colored square for each interval
//    for (var i = 0; i < grades.length; i++) {
//        div.innerHTML +=
//            '<i style="background:' + activityColor({away:grades[i],charId:1}) + '"></i> ' +
//            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//    }
//
//    return div;
//};
//
////activityLegend.addTo(map);