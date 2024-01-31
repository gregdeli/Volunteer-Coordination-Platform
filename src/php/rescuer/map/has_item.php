<?php
// This file is intented to be used both on its own 
// (to say if there any enough items in the cargo for a given request)
// and as a file that is included in complete_task.php
// so it can find the task_quantity and the cargo_quantity
@include "../../config_connection.php";

$ID = $_COOKIE["rescuer"];

// Find item id
if ($_GET["task"]=="request") {
    $sql = "SELECT item_id, num_people FROM request WHERE id=".$_GET["task_id"];
} else if ($_GET["task"]=="offer") {
    $sql = "SELECT item_id, quantity_offered FROM offer WHERE id=".$_GET["task_id"];
}
$result = $conn->query($sql);

$item_id=-1;
$task_quantity=-1;
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    $item_id = $row["item_id"];

    if ($_GET["task"]=="request") {
        $task_quantity = $row["num_people"];
    } else if ($_GET["task"]=="offer") {
        $task_quantity = $row["quantity_offered"];
    }
}

// Check if rescuer has the item in his cargo
$sql = "SELECT quantity FROM user INNER JOIN cargo on user.id=rescuer_id
        WHERE role='RESCUER' AND cargo.item_id=".$item_id." AND id=".$ID;

$cargo_quantity=-1;
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $cargo_quantity = $row["quantity"];
}

if ($cargo_quantity>=$task_quantity) {
    echo 1;
} else {
    echo 0;
}
