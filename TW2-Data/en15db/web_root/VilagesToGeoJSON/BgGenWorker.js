/**
 * Created by CONG on 15-Dec-15.
 */
const TOP_DOWN_TO_SLANT_RATIO = 0.6240477174329043;

// increase horz = dec vert
const HORZ_MODIFIER = 0.0264; // larger = more to the right
const VERT_MODIFIER = 1.774; // bigger = further

var mapTileHeight   = null;
var mapTileWidth    = null;

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
    tw2_dyRatio *= TOP_DOWN_TO_SLANT_RATIO * VERT_MODIFIER; // slant,  away

    //translate to geo map's displacement
    return {
        x: tw2_dxRatio * 360 - 180,
        y: tw2_dyRatio * (-180) + 90
    }
}

function map_calcVertices(center) {
    var vertices = [];
    var mapTileRadius1 = (mapTileWidth-HORZ_MODIFIER)/Math.sqrt(3);
    var mapTileRadius2 = mapTileHeight/2;

    var angles_deg = [20.92, 90, 159.08, 20.92+180, 270, 159.08+180]; // measured from Autodesk Inventor
    for(var i = 0; i < angles_deg.length; i++) {
        var angle_rad = Math.PI / 180 * angles_deg[i];

        var vertexX = center.x + mapTileRadius1 * Math.cos(angle_rad);
        var vertexY = null;
        if((i == 1) || (i == 4)) {
            vertexY = center.y + mapTileRadius2 * Math.sin(angle_rad);
        } else {
            vertexY = center.y + mapTileRadius1 * Math.sin(angle_rad);
        }

        //console.log(i, vertexX.toFixed(3), vertexY.toFixed(3));
        vertexX = Number(vertexX.toFixed(10));
        vertexY = Number(vertexY.toFixed(10));
        vertices.push([vertexX, vertexY]);
    }
    vertices.push(vertices[0]);
    return vertices;
}

function createHex(col, row) {
    var center = map_calcCenterCoor(col, row);
    return map_calcVertices(center);
}

function buildBg() {

    var features = [];
    for(var x = 500; x < 501; x++) {
        for(var y = 500; y < 501; y++) {
            var f = {
                type: "Feature",
                geometry: {
                    type: "Polygon",
                    coordinates: [
                        createHex(x,y)
                    ]
                },
                properties: {}
            };
            features.push(f);
        }
        console.log(String(x+1) + "/1000");
    }
    var featuresCollection = {
        type: "FeatureCollection",
        features: features
    };
    return featuresCollection
}

self.addEventListener('message', function(e) {
    var data = e.data;
    if(e.data == "start") {
        var bg = JSON.stringify(buildBg());
        console.log('bg stringified');
        self.postMessage(bg);
    }
}, false);