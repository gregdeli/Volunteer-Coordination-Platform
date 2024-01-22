<?php
/** @var mysqli $conn */
include "../../config_connection.php";

$categories = json_decode($_GET['categories']);

// Constructing the WHERE clause for category IDs
$categoryIds = implode(",", $categories);

$sql = "SELECT it.name AS item_name, it.category_id, it.quantity AS warehouse_quantity,
    cargo.quantity AS vehicles_quantity
    FROM item AS it
    LEFT JOIN cargo ON it.id = cargo.item_id
    WHERE it.category_id IN ($categoryIds)
    ORDER BY it.category_id ASC";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $statusData = array();
    while ($row = $result->fetch_assoc()) {
        // Constructing an array with status data
        $statusData[] = array(
            "category" => $row["category_id"],
            "item" => $row["item_name"],
            "quantity_warehouse" => $row["warehouse_quantity"],
            "quantity_vehicles" => $row["vehicles_quantity"],
        );
    }
    // Sending the status data as JSON response
    echo json_encode($statusData);
} else {
    echo json_encode(array("response"=>"No items found"));
}

$conn->close();
