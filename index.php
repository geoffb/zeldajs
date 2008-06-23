<?php
$CONCAT = false;
if (!empty($_REQUEST['concat'])) {
	$CONCAT = true;
}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN"
   "http://www.w3.org/TR/html4/strict.dtd">

<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Test Game</title>
	<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.5.0/build/reset/reset-min.css">
	<link rel="stylesheet" type="text/css" href="css/style.css"> 
</head>
<body>
	<?php if ($CONCAT) { ?>
		<!-- use concat'd file -->
	<?php } else { ?>
		<script src="http://yui.yahooapis.com/2.5.2/build/yahoo-dom-event/yahoo-dom-event.js" type="text/javascript"></script>
		<script src="js/assets.js" type="text/javascript"></script>
		<script src="js/entity.js" type="text/javascript"></script>
		<script src="js/tile.js" type="text/javascript"></script>
		<script src="js/room.js" type="text/javascript"></script>
		<script src="js/map.js" type="text/javascript"></script>
		<script src="js/renderer.js" type="text/javascript"></script>
		<script src="js/engine.js" type="text/javascript"></script>
		<script src="js/execute.js" type="text/javascript"></script>
	<?php } ?>
</body>
</html>
