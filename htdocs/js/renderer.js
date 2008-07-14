(function() {
	var G = YAHOO.Ganon;
	G.Renderer = function() {
		this.parent_node = null;
		this.surfaces = [];
		this.view_width = 320;
		this.view_height = 240;
		this.tile_width = 16;
		this.tile_height = 16;
		this.scale = 1.0;
	};
	var P = G.Renderer.prototype;
	P.init = function(node) {
		this.parent_node = node;
		this.initSurfaces();
	};
	P.initSurfaces = function() {
		// TODO: Remove hardcoded room size
		var w = 16 * this.tile_width;
		var h = 11 * this.tile_height;
		this.createSurface('room_buffer', w, h, false);
		this.createSurface('room_buffer2', w, h, false);
		this.createSurface('view', this.view_width * this.scale, this.view_height * this.scale, true);
	};
	P.createSurface = function(id, w, h, visible) {
		var c = document.createElement('canvas');
		c.id = id;
		c.width = w;
		c.height = h;
		if (!visible) { c.style.display = 'none'; }
		this.parent_node.appendChild(c);
		this.surfaces[id] = c;
	};
	P.drawRoomToBuffer = function(room, tiles) {
		var context = this.surfaces['room_buffer'].getContext('2d');
		var tw = this.tile_width; var th = this.tile_height;
		for (var y = 0; y < room.height; y++) {
			for (var x = 0; x < room.width; x++) {
				var tile = room.tiles(x, y);
				context.drawImage(tiles, tile.graphic[0] * tw, tile.graphic[1] * th, tw, th, x * tw, y * th, tw, th);
			}
		}
	};
	P.drawRoomToView = function() {
		var context = this.surfaces['view'].getContext('2d');
		var rb = this.surfaces['room_buffer'];
		context.drawImage(rb, 0, 0, rb.width, rb.height, 0, 0, rb.width * this.scale, rb.height * this.scale);
	};
	P.drawChangeRoomToView = function(elapsed, speed, direction) {
		var d = speed * (elapsed / 100);
		var context = this.surfaces['view'].getContext('2d');
		var rb = this.surfaces['room_buffer'];
		var rb2 = this.surfaces['room_buffer2'];

		if (d > rb.height) { return true; }


		
		if (direction === 0) {
			var src = new G.Rectangle(0, 0, rb.width, d);
			var src2 = new G.Rectangle(0, d, rb2.width, (rb2.height - d));
		}

		context.drawImage(rb2, src2.x, src2.y, src2.width, src2.height, 0, 0, src2.width * this.scale, src2.height * this.scale);
		
		
		
		context.drawImage(rb,
			src.x, src.y, src.width, src.height, 
			0, (rb.height - d) * this.scale, src.width * this.scale, src.height * this.scale);
			
		

			
		return false;

		
		
		
	};
	P.drawEntityToView = function(e, sprites) {
		var context = this.surfaces['view'].getContext('2d');
		var tw = this.tile_width; var th = this.tile_height; var s = this.scale;
		context.drawImage(sprites, ((e.direction * 2) + e.step) * tw, e.sprite * th, tw, th, e.x * s, e.y * s, tw * s, th * s);
	};
	P.copy = function(src, dest) {
		var context = this.surfaces[dest].getContext('2d');
		var src = this.surfaces[src];
		context.drawImage(src, 0, 0);
	};
	P.getBoundingRect = function(e) {
		return new G.Rectangle(e.x, e.y, this.tile_width, this.tile_height);
	};
	P.getEntityNextBoundingRect = function(e, elapsed) {
		var d = e.speed * (elapsed / 100);
		var r = new G.Rectangle(e.x, e.y, this.tile_width, this.tile_height);
		switch (e.direction) {
			case 1:
				r.y -= d;
				break;
			case 0:
				r.y += d;
				break;
			case 2:
				r.x -= d;
				break;
			case 3:
				r.x += d;
				break;
		}
		return r;
	};
	P.getRoomBoundingRect = function(r) {
		return new G.Rectangle(0, 0, r.width * this.tile_width, r.height * this.tile_height);
	};
	P.convertPixelsToTile = function(x, y) {
		return new G.Point(Math.floor(x / this.tile_width), Math.floor(y / this.tile_height));
	};
})();