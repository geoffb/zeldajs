YAHOO.namespace('Zelda');

(function() {
	var renderer = function() {
		this.parent_node = null;
		this.surfaces = [];
		this.view_width = 320;
		this.view_height = 240;
		this.tile_width = 16;
		this.tile_height = 16;
		this.scale = 1.0;
	};
	var proto = renderer.prototype;
	proto.init = function(node) {
		this.parent_node = node;
		this.initSurfaces();
	};
	proto.initSurfaces = function() {
		// TODO: Remove hardcoded room size
		this.createSurface('room_buffer', 16 * this.tile_width, 11 * this.tile_height, false);
		this.createSurface('view', this.view_width * this.scale, this.view_height * this.scale, true);
	};
	proto.createSurface = function(id, w, h, visible) {
		var c = document.createElement('canvas');
		c.id = id;
		c.width = w;
		c.height = h;
		if (!visible) { c.style.display = 'none'; }
		this.parent_node.appendChild(c);
		this.surfaces[id] = c;
	};
	proto.drawRoomToBuffer = function(room, tiles) {
		var context = this.surfaces['room_buffer'].getContext('2d');
		var tw = this.tile_width; var th = this.tile_height;
		for (var y = 0; y < room.height; y++) {
			for (var x = 0; x < room.width; x++) {
				var tile = room.tiles(x, y);
				context.drawImage(tiles, tile.graphic[0] * tw, tile.graphic[1] * th, tw, th, x * tw, y * th, tw, th);
			}
		}
	};
	proto.drawRoomToView = function() {
		var context = this.surfaces['view'].getContext('2d');
		var rb = this.surfaces['room_buffer'];
		context.drawImage(rb, 0, 0, rb.width, rb.height, 0, 0, rb.width * this.scale, rb.height * this.scale);
	};
	proto.drawEntityToView = function(e, sprites) {
		var context = this.surfaces['view'].getContext('2d');
		var tw = this.tile_width; var th = this.tile_height; var s = this.scale;
		context.drawImage(sprites, ((e.direction * 2) + e.step) * tw, e.sprite * th, tw, th, e.x * s, e.y * s, tw * s, th * s);
	};
	proto.getBoundingRect = function(e) {
		return new YAHOO.Zelda.Rectangle(e.x, e.y, this.tile_width, this.tile_height);
	};
	proto.convertPixelsToTile = function(x, y) {
		return new YAHOO.Zelda.Point(Math.floor(x / this.tile_width), Math.floor(y / this.tile_height));
	};
	YAHOO.Zelda.Renderer = renderer;
})();