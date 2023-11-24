<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION['username']) && !isset($_SESSION['password'])) {
    header("Location: login.html"); // Redirect to login page if not logged in
    exit();
}
?>