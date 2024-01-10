<?php
    @include "../config_connection.php";   
    

    $min_length_username = 2;
    $min_length_password = 5;
    $min_length_fullname = 1;
    $min_length_phone = 10;

    if($_POST['user'] == 1) 
        $user = "RESCUER";
    else if($_POST['user'] == 2)
        $user = "CIVILIAN";

    if($_SERVER["REQUEST_METHOD"] == "POST"){
    
        $username = mysqli_real_escape_string($conn, $_POST['username']);
        $password = md5($_POST['password']);
        $r_password = md5($_POST['r_password']);
        $fullname = mysqli_real_escape_string($conn, $_POST['fullname']);
        $phone = mysqli_real_escape_string($conn, $_POST['phone']);

        $valid_password = ($password == $r_password) && strlen($_POST['password']) >= $min_length_password;
 
        $min_length = strlen($username) >= $min_length_username && strlen($fullname) >= $min_length_fullname;

        $valid_phone = ctype_digit($phone) && strlen($phone) == $min_length_phone ;
  

        if($valid_password && $min_length && $valid_phone){
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
                   $insert = "INSERT INTO user VALUES (NULL, '$username', '$password', '$user', '$fullname', '$phone', NULL, NULL)";  
                    mysqli_query($conn, $insert);  
                    echo json_encode(['value' => true, 'message' => 'Success']); 
                }        
            }
        }
        else{
            echo "Registration FAILED";
        }

    }
?>