(function() {
	var G = YAHOO.Ganon;
	G.Tile = function() {
		this.define(0, 0, true);
	};
	var P = G.Tile.prototype;
	P.define = function(gx, gy, walkable) {
		this.graphic = [gx, gy];
		this.walkable = walkable;
	};
	P.load = function(data) {
		this.graphic = [data[0], data[1]];
		this.walkable = data[2];
	}
})();