<?php

/** @var mysqli $conn */
include "../../config_connection.php";
include "constants.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Check if the necessary data is present in the POST request
    if (isset($_FILES["json_file"])) {
        $json_file = $_FILES["json_file"];
        $file_name = $json_file["name"];
        $file_tmp = $json_file["tmp_name"];

        // Read the content of the uploaded JSON file
        $json_content = file_get_contents($file_tmp);

        // Decode JSON
        $data = json_decode($json_content, true);

        // Insert the categories
        foreach ($data['categories'] as $category) {
            $category_id = $category['id'];
            $category_name = $category['category_name'];

            // Check if the category name is not empty before inserting and doesnt exceed the maximum length
            if (!empty($category_name) && strlen($category_name) <= MAX_LENGTH) {
                // Insert category data into item_categories table
                $sql = "INSERT IGNORE INTO category (id, name) VALUES ('$category_id', '$category_name')";
                $conn->query($sql);
            }
        }

        // Insert the items
        foreach ($data['items'] as $item) {
            $item_id = $item['id'];
            $item_name = $item['name'];
            $category_id = $item['category'];

            // Check if the item name is not empty before inserting
            if (!empty($item_name) && strlen($item_name) <= MAX_LENGTH) {
                $sql = "INSERT IGNORE INTO item (id, name, category_id, quantity) VALUES ('$item_id', '$item_name', '$category_id', '0')";
                $conn->query($sql);
            }

            // Insert details if they exists
            foreach ($item['details'] as $detail) {
                $detail_name = $detail['detail_name'];
                $detail_value = $detail['detail_value'];

                // Insert detail data into specified_items_details table
                $sql = "INSERT IGNORE INTO description (item_id, detail_name, detail_value) VALUES ('$item_id', '$detail_name', '$detail_value')";

                $conn->query($sql);
            }
        }
    }
} else {
    // If it's not a POST request, return a method not allowed error
    header("HTTP/1.1 405 Method Not Allowed");
    echo json_encode(array("error" => "Method not allowed"));
}

$conn->close();
