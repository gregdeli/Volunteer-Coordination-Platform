<?php

    $db_server = "localhost";
    $db_user = "root"; 
    $db_pass = "";
    $db_name = "volunteer_coordination";

    try{
        $conn = new mysqli($db_server, $db_user, $db_pass, $db_name);
    }
    catch(mysqli_sql_exception $e){
        echo "Could not connect! Error: " . $e->getMessage() . "<br>";
    }
?>

