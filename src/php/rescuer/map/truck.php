<?php
@include "../../config_connection.php";

$id = $_GET["id"];
$lat = $_GET["lat"];
$lon = $_GET["lon"];

$sql = "UPDATE user SET latitude=".$lat.", longitude=".$lon." WHERE id=".$id." AND role='RESCUER';";
$result = $conn->query($sql);

$conn->close();
?>