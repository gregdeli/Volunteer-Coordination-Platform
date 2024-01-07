<?php

    if(isset($_COOKIE["user"])){
        echo json_encode(['value' => true, 'message' => 'connected']);
    }
    else{
        echo json_encode(['value' => false, 'message' => '/src/pages/login/index.html']);
    }

?>