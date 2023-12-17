<?php
include('config_connection.php');

// Fetch JSON data
$repURL = 'http://usidas.ceid.upatras.gr/web/2023/export.php';
$repData = file_get_contents($repURL);

// Decode JSON
$data = json_decode($repData, true);

// Insert the categories
foreach ($data['categories'] as $category) {
    $category_id = $category['id'];
    $category_name = $category['category_name'];

    // Insert category data into item_categories table
    $sql = "INSERT IGNORE INTO item_categories (id, name) VALUES ('$category_id', '$category_name')";

    if ($conn->query($sql) !== TRUE) {
        echo "Error inserting category: " . $conn->error;
    }
}

// Insert the items
foreach ($data['items'] as $item) {
    $item_id = $item['id'];
    $item_name = $item['name'];
    $category_id = $item['category'];

    // Prepare and insert item data into specified_items table
    $sql = "INSERT IGNORE INTO specified_items (id, item, category_id) VALUES ('$item_id', '$item_name', '$category_id')";

    if ($conn->query($sql) !== TRUE) {
        echo "Error inserting item: " . $conn->error;
    }

    // Insert details if they exists
    foreach ($item['details'] as $detail) {
        $detail_name = $detail['detail_name'];
        $detail_value = $detail['detail_value'];

        // Insert detail data into specified_items_details table
        $sql = "INSERT IGNORE INTO item_details (item_id, name, value) VALUES ('$item_id', '$detail_name', '$detail_value')";

        if ($conn->query($sql) !== TRUE) {
            echo "Error inserting detail: " . $conn->error;
        }
    }
}

?>