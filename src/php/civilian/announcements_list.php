<?php
include('../config_connection.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $selected_func = $_GET['func'];
    if ($selected_func == 1) {
        getAnnouncements($conn);
    } elseif ($selected_func == 2) {
        $items = $_GET['items'];
        $items = explode(',', $items);
        $quantities = $_GET['quan'];
        $quantities = explode(',', $quantities);
        createOffer($conn, $items, $quantities);
    } else {
        echo 'SELECTION_ERROR';
    }
}

function getAnnouncements($conn) {
    $query = "SELECT announcement_id,date_announced,item_id,item_name,counter FROM 
                    (SELECT a.id AS announcement_id, a.date_announced AS date_announced,
                        i.id AS item_id, i.name AS item_name FROM announcement AS a
                        JOIN announcement_item AS ai ON a.id = ai.announcement_id
                        JOIN item AS i ON ai.item_id = i.id
                        ORDER BY a.id DESC
                    ) as select1
                    JOIN 
                    ( SELECT COUNT(*) AS counter, announcement_id as id
                      FROM announcement_item GROUP BY announcement_id
                    ) AS select2 ON select1.announcement_id = select2.id
                    ORDER BY announcement_id DESC";

    $result = mysqli_query($conn, $query);
    if (mysqli_num_rows($result) == 0) {
        echo json_encode(array('id' => 0,'message' => 'NO ANNOUNCEMENT FOUND'));
    } else {
        while($row = mysqli_fetch_assoc($result)){
            $announcements[] = $row;
        }
        echo json_encode($announcements);
    }
}

function createOffer($conn, $items, $quantities) {
    $user = $_COOKIE['civilian'];
    date_default_timezone_set('Europe/Athens');
    $date_time = date('Y-m-d H:i:s');
    $valid = 1;

    for($i=0; $i<count($items); $i++) {
        if (!($quantities[$i] > 0))
            continue;
        $query = "INSERT INTO offer VALUES (NULL, $user, $items[$i], $quantities[$i], '$date_time', NULL, NULL)";
        $result = mysqli_query($conn, $query);
        if(!$result) 
            $valid = -1; 
    }

    if ($valid == 1)
        echo json_encode(array('response' => 'Offer Stored!'));
    else
        echo json_encode(array('response' => 'Failed'));
}
