<?php

session_start();
session_destroy();
header("Location: login_form.html"); // Redirect to login page after logout
exit();

?>
