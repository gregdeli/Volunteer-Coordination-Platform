<?php
    setcookie("admin", "", time() - 3600, '/');
    setcookie("rescuer", "", time() - 3600, '/');
    setcookie("civilian", "", time() - 3600, '/');

    header("Location: /src/pages/authentication/log_in.html");
?>