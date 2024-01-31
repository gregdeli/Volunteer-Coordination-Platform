<?php
@include "../../config_connection.php";

$inventory = [];

$sql = "SELECT item.id as id, item.name as name, quantity, category.name as category
        FROM item INNER JOIN category on category.id=item.category_id ORDER BY category";
$result = $conn->query($sql);
if ($result->num_rows > 0)
    while($row = $result->fetch_assoc())
        $inventory[] = ["id"=>intval($row["id"]),
                                "name"=>$row["name"],
                                "quantity"=>intval($row["quantity"]),
                                "category"=>$row["category"]];

$conn->close();
echo json_encode($inventory, JSON_PRETTY_PRINT);
