console.clear();
var start = 0;

var backgroundGeo;
/* UI events */
startBtn.addEventListener('click', onStart);
function onStart(event) {
    backgroundGeo = [];
    for(var x = 0; x < 1000; x++) {
        for(var y = 0; y < 1000; y++) {
            if(x % 100 == 0 && y % 100 == 0) {
                console.log(x,y);
            }
            backgroundGeo.push(createGeoFeatureWithoutProperties(x, y));
        }
    }
    console.log("Done. Call save() to save manually.");
}

function save() {
    var str = JSON.stringify(backgroundGeo);
    console.save(backgroundGeo);
    //download("Background.json", backgroundGeo);
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
