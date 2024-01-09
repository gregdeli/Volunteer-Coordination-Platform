<?php
/** @var mysqli $conn */
include "../../config_connection.php";

// Fetch categories from the database
$sql = "SELECT id, name FROM category";

$result = $conn->query($sql);

header('Content-Type: application/json');

if ($result->num_rows > 0) {
    $categories = array();
    while ($row = $result->fetch_assoc()) {
        $categories[] = $row;
    }
    // Output categories in JSON format
    echo json_encode(array("categories" => $categories));
} else {
    echo "No categories found";
}

$conn->close();
