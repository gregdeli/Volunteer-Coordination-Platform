<?php

   @include "config_connection.php";

   session_start();

   if($_SERVER["REQUEST_METHOD"] == "POST"){

      $username = mysqli_real_escape_string($conn, $_POST["username"]);
      $password = md5($_POST["password"]);

      $query = " SELECT * FROM users WHERE username = '$username' && password = '$password' ";

      $result = mysqli_query($conn, $query);
      
      if(mysqli_num_rows($result) > 0){

         $row = mysqli_fetch_array($result);

         if($row["role"] == "ADMIN"){
            $_SESSION["admin_name"] = $row["full_name"];
            echo "admin";
         }elseif($row["role"] == "RESCUER"){
            $_SESSION["rescuer_name"] = $row["full_name"];
         }

      }else{
         echo "incorrect email or password!";  
      }
   };


?>