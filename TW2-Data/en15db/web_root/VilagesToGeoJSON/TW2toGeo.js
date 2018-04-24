console.clear();

var start = null;

const TOP_DOWN_TO_SLANT_RATIO = 0.6240477174329043;

// increase horz = dec vert
//const HORZ_MODIFIER = 0.0264; // larger = more to the right
//const VERT_MODIFIER = 1.774; // bigger = further

var mapTileHeight   = null;
var mapTileWidth    = null;

var mapSideLength = 256;

function startCompilation() {
    console.log("Starting compilation, even-r, pointy-top");
    var p1 = map_calcCenterCoor(500,500);
    var p2 = map_calcCenterCoor(501,500);
    mapTileWidth    = p2.x - p1.x;
    mapTileHeight   = mapTileWidth * 98 / 136; // TW2's tile dimensions

    convertToGeoFeature();
}

function tw2_calcDisp(endX, endY, startX, startY) {
    var dx = endX - startX;
    var dy = endY - startY;
    if (dy % 2) {
        dx += endY % 2 ? 0.5 : -0.5;
    }
    return {
        x: dx + startX,
        y: dy + startY
    };
}

// tw2 col, row
function map_calcCenterCoor(tw2Col, tw2Row) {
    var tw2_displ = tw2_calcDisp(tw2Col, tw2Row, 0, 0);
    var tw2_dxRatio = (tw2_displ.x / 1000);
    var tw2_dyRatio = tw2_displ.y / 1000; // top down
    //tw2_dyRatio *= TOP_DOWN_TO_SLANT_RATIO * VERT_MODIFIER; // slant,  away
    //tw2_dyRatio *= TOP_DOWN_TO_SLANT_RATIO; // slant,  away

    //translate to geo map's displacement
    return {
        x: tw2_dxRatio * 360 - 180,
        y: (tw2_dyRatio * (-180) + 90)*2*TOP_DOWN_TO_SLANT_RATIO
    }
}

function map_calcVertices(center) {
    var vertices = [];
    //var mapTileRadius1 = (mapTileWidth-HORZ_MODIFIER)/Math.sqrt(3);
    var mapTileRadius1 = (mapTileWidth)/Math.sqrt(3);
    var mapTileRadius2 = mapTileHeight/2 - 2/100; //

    //var angles_deg = [20.92, 90, 159.08, 20.92+180, 270, 159.08+180]; // measured from Autodesk Inventor
    var angles_deg = [30, 90, 150, 210, 270, 330];
    for(var i = 0; i < angles_deg.length; i++) {
        var angle_rad = Math.PI / 180 * angles_deg[i];

        var vertexX = center.x + mapTileRadius1 * Math.cos(angle_rad);
        var vertexY = null;
        //if((i == 1) || (i == 4)) {
        //    vertexY = center.y + mapTileRadius2 * Math.sin(angle_rad);
        //} else {
            vertexY = center.y + mapTileRadius1 * Math.sin(angle_rad);
        //}

        //console.log(i, vertexX.toFixed(3), vertexY.toFixed(3));
        vertexX = Number(vertexX.toFixed(10));
        vertexY = Number(vertexY.toFixed(10));
        vertices.push([vertexX, vertexY]);
    }
    vertices.push(vertices[0]);
    return vertices;
}

function squishHex(hex, center) {
    // last vertex was by pass reference
    for(var i = 0; i < hex.length-1; i++) {
        hex[i][1] = (hex[i][1] - center.y)*TOP_DOWN_TO_SLANT_RATIO + center.y;
    }
    return hex;
}

function createHex(col, row) {
    var center = map_calcCenterCoor(col, row);
    var hexPolygon = map_calcVertices(center);
    //return hexPolygon;
    return squishHex(hexPolygon, center);
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
function convertToGeoFeature() {
    //console.log(pa);
    var villages = villagesJSON.villages;
    var features = [];
    for(var i = 0; i < 100; i++) {
        var feature = createGeoFeatureWithoutProperties(villages[i].x, villages[i].y);
        feature.properties = villages[i];

        console.log(i+1 + "/" + villages.length);
        features.push(feature);
    }

    var featuresCollection = {
        type: "FeatureCollection",
        features: features
    };
    console.save(featuresCollection, "villagesGeo.json");
}

function generateBackground() {
    var worker = new Worker("BgGenWorker.js");

    worker.addEventListener('message', function(e) {
        console.log("DONE, saving data");
        download("bg.json", e.data);
    }, false);

    worker.postMessage("start"); // Start the worker
}

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}
