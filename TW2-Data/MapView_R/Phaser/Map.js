var map = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "mapContainer");
var mapView = {
    x: 0,
    y: 0
};

var mouseDown = false;
var mouseDownStart = {x: 0, y: 0};

var Map = function (map) {
    this.hexRadius = R.tileWidth / Math.sqrt(3);
    this.tileHexHeightRatio = R.tileHeight/(this.hexRadius*2);
    console.log(this.tileHexHeightRatio);
    this.bgTiles = null;
    this.barbTiles = null;
    this.playerTiles = null;

    this.mapCenter = null;
    this.mapTopLeft = null;
    this.mapWidth = null;
    this.mapHeight = null;

    this.renderedBounds = null;
};

Map.prototype = {
    init: function () {
        this.game.world.setBounds(0, 0, this.hexRadius*Math.sqrt(3)*1000, this.hexRadius*2*1000 );
    },
    preload: function () {
        this.load.image("barb299", R.tiles.barb299);
        this.load.image("barb999", R.tiles.barb999);
        this.load.image("barb2999", R.tiles.barb2999);
        this.load.image("barb3999", R.tiles.barb3999);
        this.load.image("barb10999", R.tiles.barb10999);
        this.load.image("barb11000", R.tiles.barb11000);
        this.load.image("barbFort", R.tiles.barbFort);

        this.load.image("town299", R.tiles.town299);
        this.load.image("town999", R.tiles.town999);
        this.load.image("town2999", R.tiles.town2999);
        this.load.image("town3999", R.tiles.town3999);
        this.load.image("town10999", R.tiles.town10999);
        this.load.image("town11000", R.tiles.town11000);
        this.load.image("townFort", R.tiles.townFort);

        var i;
        for(i = 0; i < R.tiles.empty.length; i++) {
            this.load.image("empty" + String(i), R.tiles.empty[i]);
        }
    },
    create: function () {
        var x, y;
        // input
        this.mouseDown = false;
        map.input.mouse.mouseWheelCallback = onMouseWheel;
        map.input.mouse.mouseDownCallback = onMouseDown;
        map.input.mouse.mouseUpCallback = onMouseUp;
        map.input.addMoveCallback(onMouseMove);

        // create tile groups
        this.bgTiles = this.add.group(this.game.world, "bgTiles", false, true);
        this.barbTiles = this.add.group(this.game.world, "barbTiles", false, true);
        this.playerTiles = this.add.group(this.game.world, "playerTiles", false, true);

        this.mapCenter = {x: 500, y: 500};
        this.mapWidth = window.innerWidth / R.tileWidth;
        this.mapHeight = window.innerHeight / (R.tileHeight/2);

        var topLeft = map_findTopLeft(this.mapCenter, this.mapWidth, this.mapHeight);
        // render background
        for(x = topLeft.x; x < this.mapCenter.x + this.mapWidth/2; x++) {
            for(y = topLeft.y; y < this.mapCenter.y + this.mapHeight/2; y++) {
                var loc = hex_offsetToPixel(x, y, this.hexRadius, this.tileHexHeightRatio);
                this.bgTiles.create(loc.x, loc.y, "empty" + String(Math.floor(Math.random()*18)));
            }
        }
        console.log('center: ', this.mapCenter);
        console.log('width: ', this.mapWidth);
        console.log('height: ', this.mapHeight);
        console.log(topLeft);
        // move camera to 500,500
        loc = hex_offsetToPixel(topLeft.x, topLeft.y);
        map.camera.x = loc.x;
        map.camera.y = loc.y;

        this.renderedBounds = {
            x: [topLeft.x,   this.mapCenter.x + this.mapWidth/2],
            y: [topLeft.y,  this.mapCenter.y + this.mapHeight/2]
        };
    },
    update: function () {
        var x, y, loc;
        var tilesX = (window.innerWidth/map.world.scale.x) / R.tileWidth;
        var tilesY = (window.innerHeight/map.world.scale.y) / (R.tileHeight/2);

        // remove off screen tiles

        // only render the new tiles
        if(tilesX > this.renderedBounds.x[1]) {
            for(x = this.renderedBounds.x[1]-1; x < tilesX; x++) {
                for(y = 0; y < tilesY; y++) {
                    loc = hex_offsetToPixel(x, y, this.hexRadius, this.tileHexHeightRatio);
                    this.bgTiles.create(loc.x, loc.y, "empty" + String(Math.floor(Math.random()*18)));
                }
            }

            // update the renderedBounds to prevent re-rendering
            this.renderedBounds.x = [this.renderedBounds.x[0], x];
        }

        if(tilesY > this.renderedBounds.y[1]) {
            for(y = this.renderedBounds.y[1]-1; y < tilesY; y++) {
                for(x = 0; x < tilesX; x++) {
                    loc = hex_offsetToPixel(x, y, this.hexRadius, this.tileHexHeightRatio);
                    this.bgTiles.create(loc.x, loc.y, "empty" + String(Math.floor(Math.random()*18)));
                }
            }

            //update the renderedBounds to prevent re-rendering
            this.renderedBounds.y = [this.renderedBounds.y[0], y];
        }


    }
};

function map_findTopLeft(center, width, height) {
    return {
        x: center.x - width/2,
        y: center.y - height/2
    }
}

function onMouseMove(event) {
    if(mouseDown) {
        console.log("Move camera");
        console.log(event.x, event.y);
    }
}

function onMouseUp(event) {
    mouseDown = false;
}
function onMouseDown(event) {
    mouseDown = true;
    mouseDownStart = {};
}


function onMouseWheel(event) {
    var scale = map.world.scale.x;
    if((scale <= 2) && (scale >= 0.1)){
        if(map.input.mouse.wheelDelta < 0) {
            // zoom out
            scale *= 0.9;
        } else {
            // zoom in
            scale *= 1.1;
        }
    }

    // Limit scaling factor
    if(scale > 2) {
        scale = 2;
    } else if(scale < 0.3) {
        scale = 0.3;
    }

    map.world.scale = {
        x: scale,
        y: scale
    };
}

function hex_offsetToPixel(col, row, radius, heightRatio, scale) {
    return {
        x: radius * Math.sqrt(3) * (col - 0.5 * (row&1)),
        y: radius * 3/2 * row*heightRatio
    };
}

function coord_2dTo1d(cols, x, y) {
    return y*cols + x;
}
