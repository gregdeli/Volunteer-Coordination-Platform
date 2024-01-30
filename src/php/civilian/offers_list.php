<?php
include('../config_connection.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $selected_func = $_GET['func'];
    if ($selected_func == 1) {
        getOffers($conn);
    } elseif ($selected_func == 2) {
        $id = $_GET['offer_id'];
        cancelOffer($conn, $id);
    } else {
        echo 'SELECTION_ERROR';
    }
}

function getOffers($conn) {
    $user = $_COOKIE['civilian'];

    $query = " SELECT * FROM offer WHERE civ_id = $user ORDER BY id DESC";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) == 0) {
        echo json_encode(array('id' => 0,'message' => 'NO OFFER FOUND'));
    } else {
        while($row = mysqli_fetch_assoc($result)){
            $item_id = $row['item_id'];

            $query2 = "SELECT name FROM item WHERE id = $item_id";
            $result2 = mysqli_query($conn, $query2);

            $row2 = mysqli_fetch_array($result2);

            $row['item_name'] = $row2['name'];
            $request[] = $row;
        }
        echo json_encode($request);
    }    
}

function cancelOffer($conn, $id) {

    $query = "SELECT date_completed FROM offer WHERE id = $id";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($result);

    if ($row['date_completed'] != NULL) {
        echo json_encode(array('response' => 'Cancel Failed! Rescuer has already completed the task'));
    }
    else {
        $query = "DELETE FROM offer WHERE id = $id";
        $result = mysqli_query($conn, $query);
        
        if ($result)
            echo json_encode(array('response' => 'Offer Canceled Successfully!'));   
        else
            echo json_encode(array('response' => 'Error Occurred while Offer Deletion'));  
    }
}
