<?php

@include 'config_connection.php';

session_start();

if($_SERVER["REQUEST_METHOD"] == "POST"){

   $username = mysqli_real_escape_string($conn, $_POST['username']);
   $password = md5($_POST['password']);

   $query = " SELECT * FROM db_name WHERE name = '$username' && password = '$password' ";

   $result = mysqli_query($connection, $query);

   if(mysqli_num_rows($result) > 0){

      $row = mysqli_fetch_array($result);

      if($row['user_type'] == 'admin'){

         $_SESSION['admin_name'] = $row['name'];
         header('location:admin_page.php');

      }elseif($row['user_type'] == 'user'){

         $_SESSION['user_name'] = $row['name'];
         header('location:user_page.php');

      }
     
   }else{
        echo '<span>incorrect email or password!</span>';
   }

};
?>