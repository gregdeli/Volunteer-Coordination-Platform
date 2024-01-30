<?php
@include "../../config_connection.php";

// delete task from rescuer_tasks
$sql = "DELETE FROM rescuer_task WHERE ";

if ($_GET["task"]==="request") {
    $sql = $sql."request_id=".$_GET["task_id"];
} elseif ($_GET["task"]==="offer") {
    $sql = $sql."offer_id=".$_GET["task_id"];
}
$conn->query($sql);

// update date_undertaken to NULL
$sql = "UPDATE ".$_GET["task"]." SET date_undertaken=NULL WHERE id=".$_GET["task_id"];
$conn->query($sql);

$conn->close();
