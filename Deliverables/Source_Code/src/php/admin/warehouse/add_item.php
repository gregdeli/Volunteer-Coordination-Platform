<?php

/** @var mysqli $conn */
include "../../config_connection.php";
include "constants.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Check if the necessary data is present in the POST request
    if (isset($_POST["itemname"]) && isset($_POST["itemcategory"])) {

        // Extract the form data
        $item_name = $_POST["itemname"];
        $item_category = $_POST["itemcategory"];

        // Check if the item name exceeds the maximum length
        if (strlen($item_name) > MAX_LENGTH) {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(array("error" => "Max item name lenght exceeded"));
            $conn->close();
            exit();
        }

        // Check for duplicate item names
        $check_sql = "SELECT name FROM item WHERE name = '$item_name'";
        $result = $conn->query($check_sql);

        if ($result && $result->num_rows > 0) {
            // If a duplicate category name is found, return an error response
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(array("error" => "Duplicate item name"));
        } else {
            // Insert item if no duplicates found
            $insert_sql = "INSERT INTO item (name, category_id, quantity) VALUES ('$item_name', '$item_category', '0')";
            $conn->query($insert_sql);

            // Get the ID of the last inserted item to use in the details insert
            $item_id = $conn->insert_id;

            // Loop through posted details and insert them into tha db
            for ($i = 1; $i <= count($_POST) / 2 - 1; $i++) {
                if (isset($_POST["detailname" . $i]) && isset($_POST["detailvalue" . $i])) {
                    $detail_name = $_POST['detailname' . $i];
                    $detail_value = $_POST['detailvalue' . $i];
                    // Insert detail data into specified_items_details table
                    $sql = "INSERT INTO description (item_id, detail_name, detail_value) VALUES ('$item_id', '$detail_name', '$detail_value')";
                    $conn->query($sql);
                }
            }
        }
    }
} else {
    // If it's not a POST request, return a method not allowed error
    header("HTTP/1.1 405 Method Not Allowed");
    echo json_encode(array("error" => "Method not allowed"));
}

$conn->close();