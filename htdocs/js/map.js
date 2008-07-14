(function() {
	var g = YAHOO.Ganon;
	g.map = function() {
		this.room_size = new g.vector(0, 0);
		this.rooms = null;
		this.tileset = null;
	};
	var p = g.map.prototype;
})();

(function() {
	var G = YAHOO.Ganon;
	G.Map = function() {
		this.width = 0;
		this.height = 0;
		this.rooms_array = [];
	};
	var P = G.Map.prototype;
	P.rooms = function(x, y) {
		return this.rooms_array[(y * this.width) + x];
	};
	P.roomWalk = function(p, d) {
		switch (d) {
			case 0:
				p.y += 1;
				break;
			case 1:
				p.y -= 1;
				break;
			case 2:
				p.x -= 1;
				break;
			case 3:
				p.x += 1;
				break;
		}
		return p;
	};
	P.create = function(w, h, rw, rh) {
		this.width = w;
		this.height = h;
		var length = this.height * this.width;
		for (var r = 0; r < length; r++) {
			this.rooms_array[r] = new G.Room();
			this.rooms_array[r].create(rw, rh);
		}
	};
	P.load = function(data) {
		this.width = 5;
		this.height = 5;
		var len = data.length;
		for (var x = 0; x < len; x++) {
			this.rooms_array[x] = new G.Room();
			this.rooms_array[x].load(data[x]);
		}
	};
})();