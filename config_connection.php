<?php

$connection = mysqli_connect('localhost','usename','password','db_name');
if($connection){
    die("Connection failed: ". mysqli_connect_error());
}


?>

