<?php

    if(!isset($_COOKIE["admin"])){
        echo json_encode(['value' => true, 'message' => '/src/pages/authentication/log_in.html']);
    }else{
        echo json_encode(['value' => false, 'message' => '']);
    }

?>