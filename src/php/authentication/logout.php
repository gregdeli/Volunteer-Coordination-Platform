<?php
    setcookie("admin", "", time() - 3600, '/');
    setcookie("rescuer", "", time() - 3600, '/');
    setcookie("civilian", "", time() - 3600, '/');
    
    header("Location: /src/html/authentication/log_in.html");
    exit();
?>