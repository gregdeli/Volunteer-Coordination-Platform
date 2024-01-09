<?php
@include "config_connection.php";


if($_SERVER["REQUEST_METHOD"] == "POST"){
	$username = mysqli_real_escape_string($conn, $_POST["username"]);
	$password = md5($_POST["password"]);

	$query = " SELECT * FROM user WHERE username = '$username' && password = '$password' ";
	$result = mysqli_query($conn, $query);

	if(mysqli_num_rows($result) > 0){
		$row = mysqli_fetch_array($result);

		if($row["role"] == "ADMIN"){
			$cookie_name = "admin";
			$cookie_value = $row["id"];
			setcookie($cookie_name, $cookie_value, time() + (86400 * 30)); // 86400 = 1 day
			echo json_encode(['value' => true, 'message' => '/src/pages/admin/main/map.html']);
		}elseif($row["role"] == "RESCUER"){
			$cookie_name = "rescuer";
			$cookie_value = $row["id"];
			setcookie($cookie_name, $cookie_value, time() + (86400 * 30)); // 86400 = 1 day
			echo json_encode(['value' => true, 'message' => '/src/pages/rescuer/main/.html']);//<-not this url
		}elseif($row["role"] == "CIVILIAN"){
			$cookie_name = "civilian";
			$cookie_value = $row["id"];
			setcookie($cookie_name, $cookie_value, time() + (86400 * 30)); // 86400 = 1 day
			echo json_encode(['value' => true, 'message' => '/src/pages/civilian/main/.html']);//<-notthisurl
		}
	}else{
		echo json_encode(['value' => false, 'message' => 'Incorrect Username or Password!']);
	}
};

?>