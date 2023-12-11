<?php
/** @var mysqli $conn */
include("../config_connection.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Check if the necessary data is present in the POST request
    if (isset($_POST["url"])) {
        $rep_url = $_POST["url"];
        $rep_data = file_get_contents($rep_url);

        // Decode JSON
        $data = json_decode($rep_data, true);

        // Insert the categories
        foreach ($data['categories'] as $category) {
            $category_id = $category['id'];
            $category_name = $category['category_name'];

            // Insert category data into item_categories table
            $sql = "INSERT IGNORE INTO item_categories (id, name) VALUES ('$category_id', '$category_name')";

            $conn->query($sql);
        }

        // Insert the items
        foreach ($data['items'] as $item) {
            $item_id = $item['id'];
            $item_name = $item['name'];
            $category_id = $item['category'];

            // Iinsert item data into specified_items table
            $sql = "INSERT IGNORE INTO specified_items (id, item, category_id) VALUES ('$item_id', '$item_name', '$category_id')";

            $conn->query($sql);

            // Insert details if they exists
            foreach ($item['details'] as $detail) {
                $detail_name = $detail['detail_name'];
                $detail_value = $detail['detail_value'];

                // Insert detail data into specified_items_details table
                $sql = "INSERT IGNORE INTO item_details (item_id, name, value) VALUES ('$item_id', '$detail_name', '$detail_value')";

                $conn->query($sql);
            }
        }
        $conn->close();
    }
} else {
    // If it's not a POST request, return a method not allowed error
    header("HTTP/1.1 405 Method Not Allowed");
    echo json_encode(array("error" => "Method not allowed"));
}

?>