var G = YAHOO.Ganon;
G.runGame = function() {
	var gameUpdate = function() {
		e.update();
		setTimeout(gameUpdate, 50);
	}
	var e = new G.Engine();
	var stage = YAHOO.util.Dom.get('stage');
	if (stage === null) {
		var stage = document.createElement('div');
		stage.id = 'stage';
		document.body.appendChild(stage);
	}
	e.init(stage);
	setTimeout(gameUpdate, 1000);
};
G.runGame();