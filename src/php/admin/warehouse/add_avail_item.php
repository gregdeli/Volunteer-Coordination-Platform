<?php
/** @var mysqli $conn */
include("../../config_connection.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Check if the necessary data is present in the POST request
    if (isset($_POST["item_id"]) && isset($_POST["quantity"])) {

        // Extract the form data
        $item_id = $_POST["item_id"];
        $quantity = $_POST["quantity"];

        // Isert item 
        $sql = "INSERT IGNORE INTO available_items (item_id, quantity) VALUES ('$item_id', '$quantity')";

        $conn->query($sql); 
    }
    else{
        echo "Missing form fields";
    }
} else {
    // If it's not a POST request, return a method not allowed error
    header("HTTP/1.1 405 Method Not Allowed");
    echo json_encode(array("error" => "Method not allowed"));
}

$conn->close();
?>