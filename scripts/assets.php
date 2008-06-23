#!/opt/local/bin/php
<?php
$mime = 'image/png';
$contents = file_get_contents('../images/sprites.png');
$base64   = base64_encode($contents); 
echo ('data:' . $mime . ';base64,' . $base64);
?>