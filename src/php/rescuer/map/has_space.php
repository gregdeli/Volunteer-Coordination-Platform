<?php
@include "../../config_connection.php";

$farr = [];
$farr["has_space"] = 1;
$ID = $_COOKIE["rescuer"];

$sql = "SELECT id FROM user INNER JOIN rescuer_task on id=rescuer_id WHERE role='RESCUER' AND id=".$ID;

$counter=0;
$result = $conn->query($sql);
if ($result->num_rows > 0)
    while($row = $result->fetch_assoc())
        $counter = $counter + 1;
    
if ($counter>3) {
    $farr["has_space"] = 0;
}

$conn->close();
echo json_encode($farr, JSON_PRETTY_PRINT);
?>