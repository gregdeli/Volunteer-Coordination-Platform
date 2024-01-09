<?php
    setcookie("admin", "", time() - 3600);
    header("Location: /src/pages/login/index.html");
?>