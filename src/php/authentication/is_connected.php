<?php
    if(!isset($_COOKIE['admin']) && !isset($_COOKIE['rescuer']) && !isset($_COOKIE['civilian'])){
        echo json_encode(['value' => true, 'message' => '/src/pages/authentication/log_in.html']);
    }else{
        echo json_encode(['value' => false, 'message' => '']);
    }

?>