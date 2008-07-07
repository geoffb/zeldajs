(function() {
	var G = YAHOO.Ganon;
	G.Assets = function() {
		this.init();
	};
	var P = G.Assets.prototype;
	P.init = function() {
		this.images = [];
		this.images['world-tiles'] = new Image();
		this.images['world-tiles'].src = 'images/world-tiles.png';
		this.images['sprites'] = new Image();
		this.images['sprites'].src = 'images/sprites.png';
	};
})();