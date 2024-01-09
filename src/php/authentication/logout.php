<?php
    setcookie("admin", "", time() - 3600);
    header("Location: /src/pages/authentication/log_in.html");
?>