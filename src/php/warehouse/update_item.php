<?php
/** @var mysqli $conn */
include "../config_connection.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Check if the necessary data is present in the POST request
    if (isset($_POST["item_id"]) && isset($_POST["item_name"]) && isset($_POST["quantity"])) {

        // Extract the form data
        $item_id = $_POST["item_id"];
        $item_name = $_POST["item_name"];
        $quantity = $_POST["quantity"];

        // Update the items quantity
        $sql = "UPDATE item SET quantity = '$quantity', name = '$item_name' WHERE id = '$item_id'";

        $conn->query($sql);
    } else {
        echo "Missing form fields";
    }
} else {
    // If it's not a POST request, return a method not allowed error
    header("HTTP/1.1 405 Method Not Allowed");
    echo json_encode(array("error" => "Method not allowed"));
}

$conn->close();
