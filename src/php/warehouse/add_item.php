<?php
/** @var mysqli $conn */
include("../config_connection.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Check if the necessary data is present in the POST request
    if (isset($_POST["itemname"]) && isset($_POST["itemcategory"])) {

        // Extract the form data
        $item_name = $_POST["itemname"];
        $item_category = $_POST["itemcategory"];
        

        // Isert item 
        $sql = "INSERT IGNORE INTO specified_items (item, category_id) VALUES ('$item_name', '$item_category')";

        $conn->query($sql);

        // Get the ID of the last inserted item to use in the details insert
        $item_id = $conn->insert_id;

        // Loop through posted details and insert them into tha db
        for ($i = 1; $i <= count($_POST) / 2 - 1; $i++) {
            $detail_name = $_POST['detailname' . $i];
            $detail_value = $_POST['detailvalue' . $i];
            if(strlen($detail_name) > 0 || strlen($detail_value) > 0){
                if($detail_name==""){
                    header("HTTP/1.1 400 Bad Request");
                    echo json_encode(array("error" => "No detail_name"));
                    //exit();

                }
                else if($detail_value==""){
                    header("HTTP/1.1 400 Bad Request");
                    echo json_encode(array("error" => "No detail_value"));
                    //exit();
                }
                else{
                    // Insert detail data into specified_items_details table
                    $sql = "INSERT IGNORE INTO item_details (item_id, name, value) VALUES ('$item_id', '$detail_name', '$detail_value')";
                    $conn->query($sql);
                }
            }
            else{
                echo "item added without details"; //del
            }
        }

        /*// Insert details of the item

        $detail_name = $_POST["detailname"];
        $detail_value = $_POST["detailvalue"];

        if(!empty($detail_name) && !empty($detail_value)){
            // Insert detail data into specified_items_details table
            $sql = "INSERT IGNORE INTO item_details (item_id, name, value) VALUES ('$item_id', '$detail_name', '$detail_value')";

            $result = $conn->query($sql);
        }*/
        

        $conn->close();
    }
} else {
    // If it's not a POST request, return a method not allowed error
    header("HTTP/1.1 405 Method Not Allowed");
    echo json_encode(array("error" => "Method not allowed"));
}
?>