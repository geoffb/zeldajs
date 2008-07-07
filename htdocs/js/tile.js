YAHOO.namespace('Zelda');

(function() {
	var tile = function() {
		this.define(0, 0, true);
	};
	var proto = tile.prototype;
	proto.define = function(gx, gy, walkable) {
		this.graphic = [gx, gy];
		this.walkable = walkable;
	};
	YAHOO.Zelda.Tile = tile;
})();