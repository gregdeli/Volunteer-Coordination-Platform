<?php
include('../config_connection.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $selected_func = $_GET['func'];

    if ($selected_func == 1) {
        getCategories($conn);
    } else if ($selected_func == 2) {
        getItems($conn);
    } else if ($selected_func == 3) {
        $name = $_GET['name'];
        getSearchedItem($conn, $name);
    } elseif ($selected_func == 4) {
        $category = $_GET['cat'];
        getCatItems($conn, $category);
    } elseif ($selected_func == 5) {
        $items = $_GET['items'];
        $numofpeople = $_GET['number'];
        $items = explode(',', $items);
        createRequest($conn, $items, $numofpeople);
    } else {
        echo 'SELECTION_ERROR';
    }

} else {
    echo 'REQUEST_METHOD_ERROR';
}

function getCategories($conn) {
    $query = ' SELECT * FROM category ';
    $result = mysqli_query($conn, $query);
    $categories[] = array('id' => '0',
                        'name' => 'None');
    while($row = mysqli_fetch_array($result)){
        $id = $row['id'];
        $name = $row['name'];

        $categories[] = array('id' => $id,
                        'name' => $name);
    }
    echo json_encode($categories);
}

function getItems($conn) {
    $query = " SELECT id, name FROM item ";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) == 0) {
        echo json_encode(array('id' => 0,'name' => 'NO ITEM FOUND'));
    }

    while($row = mysqli_fetch_array($result)){
        $id = $row['id'];
        $name = $row['name'];

        $items[] = array('id' => $id,
                        'name' => $name);
    }
    echo json_encode($items);
}

function getSearchedItem($conn, $name) {
    $query = " SELECT id, name FROM item WHERE name = '$name'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) == 0) {
        echo json_encode(array('id' => 0,'name' => 'NO ITEM FOUND'));
    }

    while($row = mysqli_fetch_array($result)){
        $id = $row['id'];
        $name = $row['name'];

        $items[] = array('id' => $id,
                        'name' => $name);
    }
    echo json_encode($items);
}

function getCatItems($conn, $category) { 
    $query = " SELECT id, name FROM item WHERE category_id = $category";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) == 0 || $category == 0) {
        echo json_encode(array('id' => 0,'name' => 'NO ITEM FOUND'));
    } else {
        while($row = mysqli_fetch_array($result)){
            $id = $row['id'];
            $name = $row['name'];

            $items[] = array('id' => $id,
                            'name' => $name);
        }
        echo json_encode($items);
    }
}

function createRequest($conn, $items, $numofpeople) {
    $user = $_COOKIE['civilian'];
    date_default_timezone_set('Europe/Athens');
    $date_time = date('Y-m-d H:i:s');
    $counter = 0;

    foreach($items as $i) {
        $query = " INSERT INTO request VALUES (NULL, $user, $i, $numofpeople, '$date_time', NULL, NULL) ";
        $result = mysqli_query($conn, $query);
        if($result) 
            $counter = $counter+1;           
    }
    if ($counter == count($items))
        echo json_encode(array('response' => 'Success'));
    else
        echo json_encode(array('response' => 'Failed'));
}
