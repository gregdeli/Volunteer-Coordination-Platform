<?php

/** @var mysqli $conn */
include "../../config_connection.php";
include "constants.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Check if the necessary data is present in the POST request
    if (isset($_POST["catname"])) {
        // Extract the form data
        $category_name = $_POST["catname"];

        // Check if the item name exceeds the maximum length
        if (strlen($category_name) > MAX_LENGTH) {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(array("error" => "Max category name lenght exceeded"));
            $conn->close();
            exit();
        }

        // Check for duplicate category names
        $check_sql = "SELECT name FROM category WHERE name = '$category_name'";
        $result = $conn->query($check_sql);

        if ($result && $result->num_rows > 0) {
            // If a duplicate category name is found, return an error response
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(array("error" => "Duplicate category name"));
        } else {
            // Insert item if no duplicates found
            $insert_sql = "INSERT INTO category (name) VALUES ('$category_name')";
            $conn->query($insert_sql);
        }
    }
} else {
    // If it's not a POST request, return a method not allowed error
    header("HTTP/1.1 405 Method Not Allowed");
    echo json_encode(array("error" => "Method not allowed"));
}
$conn->close();
