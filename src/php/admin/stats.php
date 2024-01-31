<?php
    @include "../config_connection.php";

    $farr = [];
    $farr["newr"] = [];
    $farr["newo"] = [];
    $farr["undr"] = [];
    $farr["undo"] = [];

    $sql = "SELECT date_submitted FROM request WHERE date_completed is NULL";
    $result = $conn->query($sql);
    if ($result->num_rows > 0)
        while($row = $result->fetch_assoc())
            $farr["newr"][]=$row["date_submitted"];

    $sql = "SELECT date_submitted FROM offer WHERE date_completed is NULL";
    $result = $conn->query($sql);
    if ($result->num_rows > 0)
        while($row = $result->fetch_assoc())
            $farr["newo"][]=$row["date_submitted"];

    $sql = "SELECT date_completed FROM request WHERE date_completed is NOT NULL";
    $result = $conn->query($sql);
    if ($result->num_rows > 0)
        while($row = $result->fetch_assoc())
            $farr["undr"][]=$row["date_completed"];

    $sql = "SELECT date_completed FROM offer WHERE date_completed is NOT NULL";
    $result = $conn->query($sql);
    if ($result->num_rows > 0)
        while($row = $result->fetch_assoc())
            $farr["undo"][]=$row["date_completed"];

    $conn->close();
    echo json_encode($farr);
