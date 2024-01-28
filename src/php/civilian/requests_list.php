<?php
include('../config_connection.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $user = $_COOKIE['civilian'];

    $query = " SELECT * FROM request WHERE civ_id = $user ORDER BY id DESC";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) == 0) {
        echo json_encode(array('id' => 0,'message' => 'NO REQUEST FOUND'));
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
