<?php
@include "../config_connection.php";

$lat = $_GET["lat"];
$lon = $_GET["lon"];

$sql = "UPDATE base SET latitude = ".$lat.", longitude = ".$lon;
$result = $conn->query($sql);

$conn->close();
