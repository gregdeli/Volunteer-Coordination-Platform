<?php

    session_start();
    session_destroy();
    header("Location: /src/pages/login/index.html"); 
    exit();

?>
