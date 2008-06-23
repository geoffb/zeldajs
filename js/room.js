YAHOO.namespace('Zelda');

(function() {
	// TODO: Add entity data
	var room = function() {
		this.width = 0;
		this.height = 0;
		this.tiles_array = [];
	};
	var proto = room.prototype;
	proto.create = function(w, h) {
		this.width = w;
		this.height = h;
		var length = this.height * this.width;
		for (var t = 0; t < length; t++) {
			this.tiles_array[t] = new YAHOO.Zelda.Tile();
		}
	};
	proto.tiles = function(x, y) {
		if (x < 0 || x >= this.width || y < 0 || y >= this.height) { return false; }
		return this.tiles_array[(y * this.width) + x];
	};
	YAHOO.Zelda.Room = room;
})();