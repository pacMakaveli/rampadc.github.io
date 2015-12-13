var map = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "mapContainer");
var Map = function (map) {
    this.hexRadius = R.tileWidth / Math.sqrt(3);
    this.tileHexHeightRatio = R.tileHeight/(this.hexRadius*2);
    this.bgTiles = null;
    this.barbTiles = null;
    this.playerTiles = null;

    this.zoom = 1;
};

Map.prototype = {
    init: function () {
        this.game.world.setBounds(0, 0, 992, 480);
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
        // create a background map
        this.bgTiles = this.add.group(this.game.world, "bgTiles", false, true);
        var x, y, idx, loc;

        var xSize = window.innerWidth * this.zoom / this.hexRadius * Math.sqrt(3);
        var ySize = window.innerHeight * this.zoom / this.hexRadius * 2;

        for(x = 0; x < xSize; x++) {
            for(y = 0; y < ySize; y++) {
                idx = Math.floor(Math.random()*18);
                loc = hex_offsetToPixel(x,y, this.hexRadius, this.tileHexHeightRatio);
                this.bgTiles.create(loc.x, loc.y - this.hexRadius, "empty"+String(idx));
            }
        }

        // create a barb map
        this.barbTiles = this.add.group(this.game.world, "barbTiles", false, true);
        for(x = 0; x < xSize; x++) {
            for(y = 0; y < ySize; y++) {
                loc = hex_offsetToPixel(x,y, this.hexRadius, this.tileHexHeightRatio);
                this.barbTiles.create(loc.x, loc.y - this.hexRadius, "barbFort");
            }
        }

        // create a player map
        this.playerTiles = this.add.group(this.game.world, "playerTiles", false, true);

        //// listen to mouse events
        //map.input.mouse.capture = true;
        //map.input.mouse.mouseWheelCallback = onMouseWheel;
    },
    update: function () {
    }
};

function onMouseWheel(event) {
    if(map.input.mouse.wheelDelta < 0) {
    }

}

function hex_offsetToPixel(col, row, radius, heightRatio) {
    return {
        x: radius * Math.sqrt(3) * (col - 0.5 * (row&1)),
        y: radius * 3/2 * row*heightRatio
    };
}
