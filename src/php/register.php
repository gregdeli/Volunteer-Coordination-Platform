<?php
    @include "config_connection.php";   

    session_start();    
    
    if($_SERVER["REQUEST_METHOD"] == "POST"){
    
        $username = mysqli_real_escape_string($conn, $_POST['username']);
        $password = md5($_POST['password']);
        $r_password = md5($_POST['r_password']);
        $fullname = mysqli_real_escape_string($conn, $_POST['fullname']);
        $phone = mysqli_real_escape_string($conn, $_POST['phone']);

        if($password != $r_password){
            echo "NotMatching";
        }
        else{
            $query = " SELECT * FROM user WHERE username = '$username' && password = '$password' && role = 'RESCUER' && full_name = '$fullname' && phone = '$phone' ";

            $result = mysqli_query($conn, $query);
    
            if(mysqli_num_rows($result) > 0){    
                echo json_encode(['value' => false, 'message' => 'User already exists']);
            }else{
                $query = " SELECT * FROM user WHERE username = '$username' ";
                $result = mysqli_query($conn, $query);
                if(mysqli_num_rows($result) > 0){
                    echo json_encode(['value' => false, 'message' => 'Username already exists']);
                }else{
                   $insert = "INSERT INTO user VALUES (NULL, '$username', '$password', 'RESCUER', '$fullname', $phone, NULL, NULL)";  
                    mysqli_query($conn, $insert);  
                    echo json_encode(['value' => true, 'message' => 'Success']); 
                }
                
                
            }
        }

    };  
?>