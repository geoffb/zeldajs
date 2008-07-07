YAHOO.namespace('Zelda');

(function() {
	var Z = YAHOO.Zelda;
	Z.Assets = function() {
		this.init();
	};
	var P = Z.Assets.prototype;
	P.init = function() {
		this.images = [];
		this.images['world-tiles'] = new Image();
		this.images['world-tiles'].src = 'images/world-tiles.png';
		this.images['sprites'] = new Image();
		this.images['sprites'].src = 'images/sprites.png';
	};
})();