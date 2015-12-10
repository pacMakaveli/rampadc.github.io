console.clear();
var vNameRegex = /Villages\.json/;
var villagesJSON;
var geoJSON;
var vFile, paFile;
var start = 0;

/* UI events */
inputBtn.addEventListener('change', onFilesSelected);
function onFilesSelected(event) {
    var files = event.target.files; // FileList object

    villageFileName = vNameRegex.exec(files[0].name);
    if(villageFileName != null) {
        vFile = files[0];
        if(files.length > 1) paFile = files[1];
    } else {
        vFile = files[1];
        if(files.length > 1) paFile = files[0];
    }

    var frPA = new FileReader();
    var frV = new FileReader();

    frV.onload = function() {
        villagesJSON = JSON.parse(frV.result);

        startCompilation();
    };

    frPA.onload = function() {
        pa = JSON.parse(frPA.result);
        console.log("Getting a snapshot of the combined PA json");
        pa = Defiant.getSnapshot(pa);
        startCompilation();
    };

    frPA.readAsText(paFile);
    frV.readAsText(vFile);
}

function startCompilation() {
    start += 1;

    if(start == 2) {
        console.log("Starting");
        convertToGeoFeature(villagesJSON.villages, 0);
    }

}
/**
 * Helper save function
 */
(function(console) {
        console.save = function(data, filename) {

            if (!data) {
                console.error('Console.save: No data');
                return;
            }

            if (!filename)
                filename = 'console.json';
            if (typeof data === "object") {
                data = JSON.stringify(data, undefined, 4)
            }

            var blob = new Blob([data],{
                    type: 'text/json'
                })
                ,
                e = document.createEvent('MouseEvents')
                ,
                a = document.createElement('a');

            a.download = filename;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
            e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null );
            a.dispatchEvent(e)
        }
    }
)(console);

/*
 * Villages + PA JSON to GeoJSON
 */
var hexRadius = calcHexRadius();
function calcDist(x1, y1, x2, y2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    if (dy % 2) {
        dx += y1 % 2 ? 0.5 : -0.5;
    }
    return {
        x: dx,
        y: dy
    };
}

function calcHexRadius() {
    var c1 = calcGeoCoor(500,500);
    var c2 = calcGeoCoor(501,500);

    return (c2.x - c1.x)/Math.sqrt(3);
}

function calcGeoCoor(col, row) {
    var dist = calcDist(col,row,0,0);
    var tw2RatioFromTopLeft_x = dist.x / 1000;
    var tw2RatioFromTopLeft_y = dist.y / 1000;

    var geoLong = tw2RatioFromTopLeft_x * 360 - 180;
    var geoLat = tw2RatioFromTopLeft_y * (-180) + 90;

    return {
        x: geoLong,
        y: geoLat
    };
}

function calcGeoHexVertex(x,y,i) {
    var angle_deg = 60 * i   + 30;
    var angle_rad = Math.PI / 180 * angle_deg;
    var vertexX = x + hexRadius * Math.cos(angle_rad);
    var vertexY = y + hexRadius/2 * Math.sin(angle_rad);

    var verticalExtend = hexRadius/8.62; // this is so hacky
    if(i == 1) {
        vertexY += verticalExtend;
    } else if(i == 4){
        vertexY -= verticalExtend;
    }

    return [
        Number(vertexX.toFixed(10)),
        Number(vertexY.toFixed(10))
    ];
}

function calcGeoHexVertices(x, y) {
    var vertices = [];
    for(var i = 0; i < 6; i++) {
        var vertex = calcGeoHexVertex(x,y,i);
        vertices.push(vertex);
    }
    vertices.push(vertices[0]); //closing the loop

    return vertices;
}

function createHex(col, row) {
    var center = calcGeoCoor(col, row);
    return calcGeoHexVertices(center.x, center.y);
}

function createGeoFeatureWithoutProperties(col, row) {
    var feature = {
        type: "Feature",
        geometry: {
            type: "Polygon",
            coordinates: [
                createHex(col, row)
            ]
        },
        properties: {}
    };
    return feature;
}

/** Public function **/
function convertToGeoFeature(villages) {
    console.log(pa);
    var features = [];
    for(var i = 0; i < villages.length; i++) {
        var feature = createGeoFeatureWithoutProperties(villages[i].x, villages[i].y);
        if(villages[i].character_id != null) {
            var playerData = JSON.search(pa, "//players[id='" + String(villages[i].character_id + "']"));
            playerData = playerData[0];

            feature.properties = villages[i];
            feature.properties.away = playerData.away;
            feature.properties.obp = playerData.offBash;
            feature.properties.dbp = playerData.defBash;
            feature.properties.inf = playerData.inf;
            feature.properties.cav = playerData.cav;
            feature.properties.siege = playerData.siege;
            feature.properties.rank = playerData.rank;

            console.log(i+1 + "/" + villages.length);
        } else {
            feature.properties = villages[i];
            feature.properties.away = 0;
            feature.properties.obp = 0;
            feature.properties.dbp = 0;
            feature.properties.inf = 0;
            feature.properties.cav = 0;
            feature.properties.siege = 0;
            feature.properties.rank = 0;
        }
        features.push(feature);
    }
    console.save(features, "villagesGeo.json");
}