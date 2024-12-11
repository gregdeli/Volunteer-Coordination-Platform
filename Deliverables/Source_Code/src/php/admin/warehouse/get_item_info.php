<?php
/** @var mysqli $conn */
include "../../config_connection.php";

$selected_item = $_GET['selectedItem'];

// Fetch items of a specific category from the database
$sql = "SELECT name, quantity  FROM item WHERE id = $selected_item";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $name = $row["name"];
    $quantity = $row["quantity"];
    echo json_encode(array("item_name" => $name, "quantity" => $quantity));
} else {
    echo "No items found";
}

$conn->close();
