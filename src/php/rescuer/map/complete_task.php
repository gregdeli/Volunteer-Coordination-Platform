<?php
include('has_item.php');   // used for adding/removing items to/from cargo

// update date_completed
$now = "";
$sql = "SELECT NOW();";
$result = $conn->query($sql);
if ($result->num_rows > 0){
    $row = $result->fetch_assoc();
    $now = $row["NOW()"];
}

$sql = "UPDATE ".$_GET["task"]." SET date_completed='".$now."' WHERE id=".$_GET["task_id"];
$conn->query($sql);


// delete task from rescuer_task
$deleted = 0;
$sql = "DELETE FROM rescuer_task WHERE ".$_GET["task"]."_id=".$_GET["task_id"];
$result = $conn->query($sql);
if ($conn->affected_rows > 0) {
    $deleted = 1;
}


// add/remove items to/from cargo
if ($deleted==1){   // for safety (ex. double-click)
    $new_cargo_quantity = -1;
    if ($_GET["task"]=="request"){
        $new_cargo_quantity = $cargo_quantity - $task_quantity;
    } else if ($_GET["task"]=="offer") {
        $new_cargo_quantity = $cargo_quantity + $task_quantity;
    }
    echo $new_cargo_quantity;
    $sql = "UPDATE cargo SET quantity=".$new_cargo_quantity.
        " WHERE rescuer_id=".$_GET["id"]." AND item_id=".$item_id;
    $result = $conn->query($sql);
}

$conn->close();
?>