<?php
@include "../../config_connection.php";

$cargo=[];
$ID = $_COOKIE["rescuer"];

$sql = "SELECT item_id, quantity FROM cargo WHERE rescuer_id=".$ID;
$result = $conn->query($sql);
if ($result->num_rows > 0)
    while($row = $result->fetch_assoc())
        $cargo[] = ["id"=>intval($row["item_id"]),
                                "quantity"=>intval($row["quantity"])];

for ($i=0; $i < sizeof($cargo); $i++) {
    $item_id=$cargo[$i]["id"];
    $quantity=$cargo[$i]["quantity"];
    // get previous inventory quantity
    $sql = "SELECT quantity FROM item WHERE id=$item_id";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $quantity = $quantity + $row["quantity"];
    }
    // update inventory quantity
    $sql = "UPDATE item SET quantity=$quantity WHERE id=$item_id";
    $result = $conn->query($sql);
}

// remove from cargo
$sql = "DELETE FROM cargo WHERE rescuer_id=".$ID;
$result = $conn->query($sql);

$conn->close();
echo json_encode($cargo, JSON_PRETTY_PRINT);
