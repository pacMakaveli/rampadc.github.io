var map = L.map('map', {
    center: [0, 0],
    zoom: 7,
    minZoom: 5  ,
    maxZoom: 9,
    backgroundColor: "#59610A"
});

var miniMap = L.map('miniMap', {
    center: [0, 0],
    zoom: 4.5,
    minZoom: 4,
    maxZoom: 5.5,
    zoomControl: false,
    backgroundColor: "#59610A"
});

var mapGeoJson, miniMapGeoJson;
