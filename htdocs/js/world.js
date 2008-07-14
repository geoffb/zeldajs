(function() {
	var g = YAHOO.Ganon;
	g.world = function() {
		this.last_update = 0;
		this.map = null;
		this.player = null;
		this.actors = null;
		this.init();
	};
	var p = g.world.prototype;
	p.init = function() {
		this.map = new g.map();
		// populate actors from map

		// create player
		// place player at default starting location

	};
	p.update = function(time) {
		// UPDATE TIMING
		var elapsed = time - this.last_update;
		this.last_update = time;
		
		// UPDATE ACTORS
		var len = this.actors;
		for (var x = 0; x < len; x++) {
			//this.actors[x].think();
		}
		
	};
})();