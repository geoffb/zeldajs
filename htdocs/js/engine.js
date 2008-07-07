YAHOO.namespace('Zelda');

(function() {
	var rect = function(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
	};
	YAHOO.Zelda.Rectangle = rect;
})();

(function() {
	var point = function(x, y) {
		this.x = x;
		this.y = y;
	};
	YAHOO.Zelda.Point = point;
})();

(function() {
	var Z = YAHOO.Zelda;
	// TODO: The asset loading is sooooo hacky. Must rewrite.
	var engine = function() {
		this.last_update = 0;
		this.elapsed = 0;
		this.render = null;
		this.map = null;
		this.tiles = null;
		this.sprites = null;
		this.entities = [];
		this.player = null;
		this.current_room = null;
		this.room_drawn = false;
		this.assets = new Z.Assets();
	};
	var proto = engine.prototype;
	proto.init = function(parent_node) {
		this.loadAssets();
		this.render = new Z.Renderer();
		this.render.scale = 2.0;
		this.render.init(parent_node);
		this.initMap();
		this.player = new Z.Entity();
		this.player.sprite = 0;
		this.player.animateWhileIdle = false;
		this.initEntities();
		YAHOO.util.Event.addListener(document, 'keyup', this.keyUp, this);
		YAHOO.util.Event.addListener(document, 'keydown', this.keyDown, this);
	};
	proto.initMap = function() {
		this.current_room = new Z.Point(0, 0);
		// TODO: Implement a *real* map loading function...
		this.map = new Z.Map();
		this.map.create(5, 5, 16, 11);
		var r = this.map.rooms(this.current_room.x, this.current_room.y);
		r.tiles(0, 0).graphic = [0, 1];
		r.tiles(1, 0).graphic = [0, 1];
		r.tiles(2, 0).graphic = [0, 1];
		r.tiles(3, 0).graphic = [0, 1];
		r.tiles(4, 0).graphic = [0, 1];
		r.tiles(5, 0).graphic = [0, 1];
		r.tiles(6, 0).graphic = [0, 1];
		r.tiles(7, 0).graphic = [0, 1];
		r.tiles(8, 0).graphic = [0, 1];
		r.tiles(9, 0).graphic = [0, 1];
		r.tiles(10, 5).graphic = [0, 2];
		r.tiles(10, 5).walkable = false;
		r.tiles(11, 0).graphic = [0, 1];
		r.tiles(12, 0).graphic = [0, 1];
		r.tiles(13, 0).graphic = [0, 1];
		r.tiles(14, 0).graphic = [0, 1];
		r.tiles(15, 0).graphic = [0, 1];
		//console.log(this.map);
	};
	proto.initEntities = function() {
		// TODO: Implement entity loading from room data
		for (var x = 0; x < 6; x++) {
			var e = new Z.Entity();
			e.sprite = Math.floor(Math.random() * 2) + 1;
			e.x = Math.floor(Math.random() * (15 * 16));
			e.y = Math.floor(Math.random() * (10 * 16));
			e.moving = true;
			e.speed = 5;
			this.entities[x] = e;
		}
	};
	proto.loadAssets = function() {
		return false;
		this.tiles = new Image();
		this.tiles.src = this.assets.images['world-tiles'];
		this.sprites = new Image();
		this.sprites.src = this.assets.images['sprites'];

	};
	proto.doFrame = function() {
		this.render.drawRoomToView();
		// player
		this.updateEntity(this.player);
		this.render.drawEntityToView(this.player, this.assets.images['sprites']);
		// non player entities
		var len = this.entities.length;
		for (var e = 0; e < len; e++) {
			this.updateEntity(this.entities[e]);
			this.render.drawEntityToView(this.entities[e], this.assets.images['sprites']);
		}
	};
	proto.updateEntity = function(e) {
		if (e !== this.player) { e.think(); }
		if (e.moving > 0) {
			var d = e.speed * (this.elapsed / 100);
			var bounding = this.render.getBoundingRect(e);
			switch (e.direction) {
				case 1:
					bounding.y -= d;
					break;
				case 0:
					bounding.y += d;
					break;
				case 2:
					bounding.x -= d;
					break;
				case 3:
					bounding.x += d;
					break;
			}
			var collide = this.checkMapCollison(bounding);
			if (collide) {
				if (e !== this.player) { e.hitWall(); }
			} else {
				e.x = bounding.x;
				e.y = bounding.y;
			}
		}
		if (e.moving > 0 || e.animateWhileIdle) {
			var elapsed = this.last_update - e.anim_last_update;
			if ((elapsed / 100) > e.anim_speed) {
				e.anim_last_update = this.last_update;
				e.step += 1;
				if (e.step >= 2) {
					e.step = 0;
				}
			}
		}
	};
	proto.checkMapCollison = function(r) {
		var point_list = [];
		point_list[0] = new Z.Point(r.x, r.y);
		point_list[1] = new Z.Point(r.x + r.width, r.y);
		point_list[2] = new Z.Point(r.x, r.y + r.height);
		point_list[3] = new Z.Point(r.x + r.width, r.y + r.height);
		var room = this.map.rooms(this.current_room.x, this.current_room.y);
		for (var p = 0; p < point_list.length; p++) {
			var pt = point_list[p];
			var tile = this.render.convertPixelsToTile(pt.x, pt.y);
			var t = room.tiles(tile.x, tile.y);
			if (!t || t.walkable === false) {
				return true;
			}
		}
		return false;
	};
	proto.changeRoom = function() {
		this.render.drawRoomToBuffer(this.map.rooms(this.current_room.x, this.current_room.y), this.assets.images['world-tiles']);
		this.room_drawn = true;
	};
	proto.keyUp = function(e, me) {
		if (e.keyCode >= 37 && e.keyCode <= 40) {
			me.player.moving -= 1;
		}
	};
	proto.keyDown = function(e, me) {
		var d = null;
		switch (e.keyCode) {
			case 37:
				d = 2;
				break;
			case 38:
				d = 1;
				break;
			case 39:
				d = 3;
				break;
			case 40:
				d = 0;
				break;
		}
		if (d !== null) {
			YAHOO.util.Event.preventDefault(e);
			if (!(me.player.moving > 0 && me.player.direction === d)) {
				me.player.direction = d;
				me.player.moving += 1;
			}
		}
	};
	proto.update = function() {
		var d = new Date();
		var t = d.getTime();
		if (this.last_update === 0) { this.last_update = t; }
		this.elapsed = t - this.last_update;
		this.last_update = t;
		if (!this.room_drawn) { this.changeRoom(); };
		this.doFrame();
	};
	Z.Engine = engine;
})();