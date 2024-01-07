<?php
    setcookie("user", "", time() - 3600);
    echo json_encode(['value' => true, 'message' => '/src/pages/login/index.html']);
?>