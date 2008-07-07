(function() {
	var G = YAHOO.Ganon;
	G.Entity = function() {
		this.x = 0;
		this.y = 0;
		this.sprite = 0;
		this.step = 0;
		this.direction = 0;
		this.moving = 0;
		this.animateWhileIdle = true;
		this.speed = 8;
		this.anim_speed = 1.5;
		this.anim_last_update = 0;
	};
	var P = G.Entity.prototype;
	P.hitWall = function() {
		this.direction = Math.floor(Math.random() * 4);
	};
	P.think = function() {
		if (this.roll(.025)) {
			this.hitWall();
		}
	};
	P.roll = function(chance) {
		var r = Math.random();
		return (r <= chance);
	}
})();