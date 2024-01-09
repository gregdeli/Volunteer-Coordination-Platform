<?php

    if(!isset($_COOKIE["admin"])){
        echo json_encode(['value' => true, 'message' => '/src/pages/login/index.html']);
    }else{
        echo json_encode(['value' => false, 'message' => '']);
    }

?>