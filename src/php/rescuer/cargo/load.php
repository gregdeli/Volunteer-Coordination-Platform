<?php
@include "../../config_connection.php";

header('Location: '."/src/html/rescuer/cargo.html");

$ID = $_COOKIE["rescuer"];

$keys = array_keys($_POST);
$valid_keys = [];

for ($i=0; $i < sizeof($keys); $i++) { 
    if ($_POST["$keys[$i]"]>0) {
        $valid_keys[] = $keys[$i];
    }
}

for ($i=0; $i < sizeof($valid_keys); $i++) { 
    $item_id=$valid_keys[$i];
    $quantity_taken=$_POST[$valid_keys[$i]];

    // Inventory
    $sql = "SELECT quantity FROM item WHERE id=$item_id";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $prev_quantity = $row["quantity"];
    }

    $new_quantity = $prev_quantity - $quantity_taken;

    $sql = "UPDATE item SET quantity=$new_quantity WHERE id=$item_id";
    $result = $conn->query($sql);

    // Cargo
    $sql = "SELECT quantity FROM cargo WHERE item_id=$item_id AND rescuer_id=$ID";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {   // If rescuer has some quantity already
        $row = $result->fetch_assoc();
        $prev_quantity = $row["quantity"];
    
        $new_quantity = $prev_quantity + $quantity_taken;

        $sql = "UPDATE cargo SET quantity=$new_quantity WHERE item_id=$item_id AND rescuer_id=$ID";
        $result = $conn->query($sql);
    } else {   // If rescuer doesn't have the item in cargo
        $sql = "INSERT INTO cargo (rescuer_id, item_id, quantity) VALUES ($ID,$item_id,$quantity_taken)";
        $result = $conn->query($sql);
    }
}

$conn->close();
echo json_encode($_POST, JSON_PRETTY_PRINT);
