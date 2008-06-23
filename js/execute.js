YAHOO.namespace('Zelda');

YAHOO.Zelda.runGame = function() {
	var gameUpdate = function() {
		zelda.update();
		setTimeout(gameUpdate, 15);
	}
	var zelda = new YAHOO.Zelda.Engine();
	var stage = YAHOO.util.Dom.get('zelda-stage');
	if (stage === null) {
		var stage = document.createElement('div');
		stage.id = 'zelda-stage';
		document.body.appendChild(stage);
	}
	zelda.init(stage);
	setTimeout(gameUpdate, 1000);
};

YAHOO.Zelda.runGame();