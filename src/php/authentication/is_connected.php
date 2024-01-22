<?php
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        $type = $_POST['type'];
        if ($type == 'admin' && !isset($_COOKIE['admin'])) {
            echo json_encode(['value' => true, 'message' => '/src/pages/authentication/log_in.html']);
        } elseif ($type == 'rescuer' && !isset($_COOKIE['resuer'])) {
            echo json_encode(['value' => true, 'message' => '/src/pages/authentication/log_in.html']);
        } elseif ($type == 'civilian' && !isset($_COOKIE['civilian'])) {
            echo json_encode(['value' => true, 'message' => '/src/pages/authentication/log_in.html']);
        } else {
            echo json_encode(['value' => false, 'message' => '']);
        }
    }
    
?>