<?php
    @include "../config_connection.php";   
    

    $min_length_username = 2;
    $min_length_password = 5;
    $min_length_fullname = 1;
    $min_length_phone = 10;
    $regex = '/^\d{1,20}(\.\d{1,20})?$/';


    if($_SERVER["REQUEST_METHOD"] == "POST"){
        if($_POST['user'] == 1 && isset($_COOKIE['admin']) )
            $user = "RESCUER";
        else if($_POST['user'] == 2)
            $user = "CIVILIAN";

        $username = mysqli_real_escape_string($conn, $_POST['username']);
        $password = md5($_POST['password']);
        $r_password = md5($_POST['r_password']);
        $fullname = mysqli_real_escape_string($conn, $_POST['fullname']);
        $phone = mysqli_real_escape_string($conn, $_POST['phone']);
        $longitude = mysqli_real_escape_string($conn, $_POST['longitude']);
        $latitude = mysqli_real_escape_string($conn, $_POST['latitude']);
       
        if ($user == 'RESCUER') {
            $query = " SELECT latitude, longitude FROM base ";
            $result = mysqli_query($conn, $query);
            $row = mysqli_fetch_array($result);
            $latitude = $row['latitude'] + 0.15;
            $longitude = $row['longitude'] + 0.15;
        }

        $valid_coordinates = TRUE;
        if ($user == 'CIVILIAN' && !preg_match($regex, $longitude) && !preg_match($regex, $latitude))
            $valid_coordinates = FALSE;

        $valid_password = ($password == $r_password) && strlen($_POST['password']) >= $min_length_password;
 
        $min_length = strlen($username) >= $min_length_username && strlen($fullname) >= $min_length_fullname;

        $valid_phone = ctype_digit($phone) && strlen($phone) == $min_length_phone ;
  

        if($valid_password && $min_length && $valid_phone && $valid_coordinates){
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
                   $insert = "INSERT INTO user VALUES (NULL, '$username', '$password', '$user', '$fullname', '$phone', $latitude, $longitude)";  
                    mysqli_query($conn, $insert);  
                    echo json_encode(['value' => true, 'message' => 'Success']); 
                }        
            }
        } else {
            echo json_encode(['value' => false, 'message' => 'Registration FAILED']);
        }

    }
?>