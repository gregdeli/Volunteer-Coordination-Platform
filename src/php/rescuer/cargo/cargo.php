<?php
@include "../../config_connection.php";

$farr = [];
$farr["vehicle"] = [];
$farr["base"] = [];
$farr["cargo"] = [];
$farr["inventory"] = [];

$sql = "SELECT latitude, longitude FROM user WHERE user.role='RESCUER' AND user.id=".$_GET["id"];
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $farr["vehicle"] = [$row["latitude"],$row["longitude"]];
}
$sql = "SELECT latitude, longitude FROM base";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $farr["base"] = [$row["latitude"],$row["longitude"]];
}

$sql = "SELECT item.id as id, item.name as item, cargo.quantity as quantity, category.name as category
        FROM user INNER JOIN cargo on user.id=rescuer_id
        INNER JOIN item on item_id=item.id INNER JOIN category on category.id=item.category_id
        WHERE user.role='RESCUER' AND user.id=".$_GET["id"];
$result = $conn->query($sql);
if ($result->num_rows > 0)
    while($row = $result->fetch_assoc())
        $farr["cargo"][] = ["id"=>intval($row["id"]),
                                "item"=>$row["item"],
                                "quantity"=>intval($row["quantity"]),
                                "category"=>$row["category"]];


$sql = "SELECT item.id as id, item.name as item, quantity, category.name as category
        FROM item INNER JOIN category on category.id=item.category_id WHERE quantity>0";
$result = $conn->query($sql);
if ($result->num_rows > 0)
    while($row = $result->fetch_assoc())
        $farr["inventory"][] = ["id"=>intval($row["id"]),
                                "item"=>$row["item"],
                                "quantity"=>intval($row["quantity"]),
                                "category"=>$row["category"]];


$conn->close();
echo json_encode($farr, JSON_PRETTY_PRINT);
?>