<?php

    @include "config_connection.php";
    
    session_start();
    
    if (!isset($_SESSION["admin_name"])) {
        //header("location: login_form.html"); 
        echo "notConnected";
    }
    else{
        echo $_SESSION["admin_name"];
    }

?>