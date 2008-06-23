YAHOO.namespace('Zelda');

(function() {
	var map = function() {
		this.width = 0;
		this.height = 0;
		this.rooms_array = [];
	};
	var proto = map.prototype;
	proto.create = function(w, h, rw, rh) {
		this.width = w;
		this.height = h;
		var length = this.height * this.width;
		for (var r = 0; r < length; r++) {
			this.rooms_array[r] = new YAHOO.Zelda.Room();
			this.rooms_array[r].create(rw, rh);
		}
	};
	proto.rooms = function(x, y) {
		return this.rooms_array[(y * this.width) + x];
	};
	YAHOO.Zelda.Map = map;
})();