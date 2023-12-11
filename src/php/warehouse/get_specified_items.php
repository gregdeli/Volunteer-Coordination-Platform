<?php
/** @var mysqli $conn */
include("../config_connection.php");

$selected_cat = $_GET['selectedCat'];

// Fetch categories from the database
$sql = "SELECT id, item FROM specified_items WHERE category_id = $selected_cat"; 

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $items = array();
    while ($row = $result->fetch_assoc()) {
        $items[] = $row;
    }
    // Output categories in JSON format
    echo json_encode(array("items" => $items));
} else {
    echo "No items found";
}

$conn->close();
?>
