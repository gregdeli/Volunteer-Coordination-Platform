<?php
@include "../../config_connection.php";

$ID = $_COOKIE["rescuer"];
$lat = $_GET["lat"];
$lon = $_GET["lon"];

$sql = "UPDATE user SET latitude=".$lat.", longitude=".$lon." WHERE id=".$ID." AND role='RESCUER';";
$result = $conn->query($sql);

$conn->close();
