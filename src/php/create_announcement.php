<?php
include('config_connection.php');

if($_SERVER["REQUEST_METHOD"] == "GET"){
    $selected_func = $_GET["func"];
}else if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $selected_func = $_POST["func"];
}else{
    echo "REQUEST_METHOD_ERROR";
}

if ($selected_func == 1){
    getCategory($conn);
}else if($selected_func == 2){
    $category = $_GET["cat"];
    getItem($category, $conn);
}else if($selected_func == 3){
    $items = $_POST["items"];
    createAnnouncement($items, $conn);
}else{
    echo "SELECTION_ERROR";
}

function getCategory($conn){
    $query = " SELECT * FROM category ";
    $result = mysqli_query($conn, $query);

    while($row = mysqli_fetch_array($result)){
        $id = $row['id'];
        $name = $row['name'];

        $categories[] = array("id" => $id,
                        "name" => $name);
    }
    echo json_encode($categories);
}

function getItem($category, $conn){
    $query = " SELECT id, name FROM item WHERE category_id = $category ";
    $result = mysqli_query($conn, $query);

    while($row = mysqli_fetch_array($result)){
        $id = $row['id'];
        $name = $row['name'];

        $items[] = array("id" => $id,
                        "name" => $name);
    }
    echo json_encode($items);
}

function createAnnouncement($items, $conn){
    $user = $_COOKIE["user"];
    $date_time = date('Y-m-d H:i:s');//now()
    
    $query = " INSERT INTO announcement VALUES (NULL, $user, '$date_time') ";
    $result = mysqli_query($conn, $query);

    if($result){
        $query = " SELECT id FROM announcement WHERE date_announced = '$date_time' ";
        $result = mysqli_query($conn, $query);
        $row = mysqli_fetch_array($result);
        $announcement = $row["id"];
        
        foreach($items as $i){
            $query = " INSERT INTO announcement_item VALUES ($announcement, $i) ";
            mysqli_query($conn, $query);
        }
    }


}

?>