var hexRadius = calcHexRadius();

function calcDisplacement(startX, startY, endX, endY) {

}

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

/** Public function **/
function convertToGeoFeature(villages) {
    var features = [];

    //for(var i = 0; i < villages.length; i++) {
    for(var i = 0; i < 80; i++) {

        var feature = {
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates: [
                    createHex(villages[i].x, villages[i].y)
                ]
            },
            properties: villages[i]
        };
        features.push(feature);
    }

    return features;
}