<?php
include('../config_connection.php');

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $selected_func = $_GET["func"];
    if ($selected_func == 1) {
        getCategory($conn);
    } else if ($selected_func == 2) {
        $category = $_GET["cat"];
        getItem($conn, $category);
    } else if ($selected_func == 3) {
        $items = $_GET["items"];
        $items = explode(',', $items);
        if ($items[0] == '') 
            echo json_encode(array('response' => 'There is no Item Selected!'));
        else 
            createAnnouncement($conn, $items);
    } else {
        echo "SELECTION_ERROR";
    }
} else {
    echo "REQUEST_METHOD_ERROR";
}



function getCategory($conn){
    $query = " SELECT * FROM category ";
    $result = mysqli_query($conn, $query);

    while($row = mysqli_fetch_array($result)) {
        $id = $row['id'];
        $name = $row['name'];

        $categories[] = array("id" => $id,
                        "name" => $name);
    }
    echo json_encode($categories);
}

function getItem($conn, $category) {
    $query = " SELECT id, name FROM item WHERE category_id = $category ";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) == 0) {
        echo json_encode(array("id" => 0,
                               "name" => 'None'));
    } else {
        while($row = mysqli_fetch_array($result)){
            $id = $row['id'];
            $name = $row['name'];

            $items[] = array("id" => $id,
                            "name" => $name);
        }
        echo json_encode($items);
    }
    
}

function createAnnouncement($conn, $items) {
    $user = $_COOKIE['admin'];
    date_default_timezone_set('Europe/Athens');
    $date_time = date('Y-m-d H:i:s');//now()//date_default_timezone_set("America/New_York");
    
    $query = " INSERT INTO announcement VALUES (NULL, $user, '$date_time') ";
    $result = mysqli_query($conn, $query);

    if ($result) {
        $query = " SELECT id FROM announcement WHERE date_announced = '$date_time' ";
        $result = mysqli_query($conn, $query);
        $row = mysqli_fetch_array($result);
        $announcement = $row["id"];
        
        foreach($items as $i){
            $query = " INSERT INTO announcement_item VALUES ($announcement, $i) ";
            mysqli_query($conn, $query);
        }
    }
    echo json_encode(array('response' => 'Success!'));

}

?>