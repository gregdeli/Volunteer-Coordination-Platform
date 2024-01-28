<?php
@include "../../config_connection.php";

$farr = [];
$farr["vehicle"] = [];
$farr["base"] = [];
$farr["cargo"] = [];
$ID = $_COOKIE["rescuer"];

$sql = "SELECT latitude, longitude FROM user WHERE user.role='RESCUER' AND user.id=".$ID;
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

$sql = "SELECT item.id as id, item.name as name, cargo.quantity as quantity, category.name as category
        FROM cargo INNER JOIN item on item_id=item.id
        INNER JOIN category on category.id=item.category_id
        WHERE rescuer_id=".$ID;
$result = $conn->query($sql);
if ($result->num_rows > 0)
    while($row = $result->fetch_assoc())
        $farr["cargo"][] = ["id"=>intval($row["id"]),
                                "name"=>$row["name"],
                                "quantity"=>intval($row["quantity"]),
                                "category"=>$row["category"]];

$conn->close();
echo json_encode($farr, JSON_PRETTY_PRINT);
