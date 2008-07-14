(function() {
	var G = YAHOO.Ganon;
	// TODO: Add entity data
	G.Room = function() {
		this.width = 0;
		this.height = 0;
		this.tiles_array = [];
	};
	var P = G.Room.prototype;
	P.create = function(w, h) {
		this.width = w;
		this.height = h;
		var length = this.height * this.width;
		for (var t = 0; t < length; t++) {
			this.tiles_array[t] = new G.Tile();
		}
	};
	P.tiles = function(x, y) {
		if (x < 0 || x >= this.width || y < 0 || y >= this.height) { return false; }
		return this.tiles_array[(y * this.width) + x];
	};
	P.load = function(data) {
		this.width = 16;
		this.height = 11;
		var len = data.length;
		for (var x = 0; x < len; x++) {
			this.tiles_array[x] = new G.Tile();
			this.tiles_array[x].load(data[x]);
		}
	};
})();