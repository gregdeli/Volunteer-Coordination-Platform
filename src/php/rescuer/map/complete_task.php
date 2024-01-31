<?php
include('has_item.php');   // used for adding/removing items to/from cargo

$ID = $_COOKIE["rescuer"];

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
        
        if ($cargo_quantity==-1) {   // if item not in cargo at all
            $sql = "INSERT INTO cargo(rescuer_id, item_id, quantity) VALUES ($ID,$item_id,0)";
            $result = $conn->query($sql);
            $new_cargo_quantity = $task_quantity;
        } else {
            $new_cargo_quantity = $cargo_quantity + $task_quantity;
        }
    }
    if ($new_cargo_quantity==0) {
        $sql = "DELETE FROM cargo WHERE item_id=".$item_id.
               " AND rescuer_id=".$ID;
    } else {
        $sql = "UPDATE cargo SET quantity=".$new_cargo_quantity.
               " WHERE rescuer_id=".$ID." AND item_id=".$item_id;
    }
    $result = $conn->query($sql);
}

$conn->close();
?>