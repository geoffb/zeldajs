(function() {
	var g = YAHOO.Ganon;
	g.actor = function() {
		this.bounds = new g.rect(0, 0, 0, 0);
		this.movement = new g.vector(0, 0);
		this.speed = 0;
		this.clipping = true;
	};
	var p = g.actor.prototype;
	p.move = function(v) {
		this.movement = v;
	};
	p.stop = function() {
		this.movement.x = 0;
		this.movement.y = 0;
	};
})();