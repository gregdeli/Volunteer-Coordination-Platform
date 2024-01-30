<?php
@include "../../config_connection.php";

$values = "";
$ID = $_COOKIE["rescuer"];

if ($_GET["task"]==="request") {
    $values = $ID.",".$_GET["task_id"].",NULL";
} elseif ($_GET["task"]==="offer") {
    $values = $ID.",NULL,".$_GET["task_id"];
}

// asign task to rescuer
$sql = "INSERT INTO rescuer_task(rescuer_id,request_id,offer_id)
        VALUES (".$values.");";
$conn->query($sql);

$now = "";
$sql = "SELECT NOW();";
$result = $conn->query($sql);
if ($result->num_rows > 0){
    $row = $result->fetch_assoc();
    $now = $row["NOW()"];
}

// update date_undertaken
$sql = "UPDATE ".$_GET["task"]." SET date_undertaken='".$now."' WHERE id=".$_GET["task_id"];
$conn->query($sql);

$conn->close();
