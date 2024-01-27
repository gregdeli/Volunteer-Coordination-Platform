<?php
@include "../config_connection.php";

[$farr, $farr["requests_on"], $farr["requests_off"], $farr["offers_on"], $farr["offers_off"],
$farr["trucks_loaded"], $farr["trucks_empty"], $farr["base"], $farr["lines"]] = 
[[],[],[],[],[],[],[],[],[]];

// Requests on
$sql = "SELECT full_name, phone, latitude, longitude, num_people, date_submitted, name, civ_id
        FROM request INNER JOIN user ON civ_id=user.id INNER JOIN item on item_id=item.id
        WHERE role='CIVILIAN' AND date_undertaken is NULL AND date_completed is NULL ORDER BY civ_id";

$result = $conn->query($sql);
if ($result->num_rows > 0)
    while($row = $result->fetch_assoc())
        $farr["requests_on"][] = array(
            "id" => intval($row["civ_id"]),
            "coo" => [floatval($row["latitude"]), floatval($row["longitude"])],
            "common_per_id" => $row["full_name"].", ".$row["phone"].", ",
            "special_per_id" => "[".$row["date_submitted"].", ".$row["name"].":".$row["num_people"]."]"
            );

// Requests off
$sql = "SELECT civ.full_name as full_name, civ.phone as phone, civ.latitude as latitude,
        civ.longitude as longitude, num_people, date_submitted,
        name, civ_id, rescuer.username as rescuer_username, date_undertaken
        FROM request INNER JOIN user as civ ON civ_id=civ.id INNER JOIN item on item_id=item.id
        INNER JOIN rescuer_task on request_id=request.id
        INNER JOIN user as rescuer on rescuer.id=rescuer_id
        WHERE civ.role='CIVILIAN' AND rescuer.role='RESCUER'
            AND request_id is NOT NULL AND date_undertaken is NOT NULL AND date_completed is NULL ORDER BY civ_id";

$result = $conn->query($sql);
if ($result->num_rows > 0)
    while($row = $result->fetch_assoc())
        $farr["requests_off"][] = array(
            "id" => intval($row["civ_id"]),
            "coo" => [floatval($row["latitude"]), floatval($row["longitude"])],
            "common_per_id" => $row["full_name"].", ".$row["phone"].", ",
            "special_per_id" => "[".$row["date_submitted"].", ".$row["rescuer_username"].", ".$row["date_undertaken"].", ".$row["name"].":".$row["num_people"]."]"
            );

// Offers on
$sql = "SELECT full_name, phone, latitude, longitude, quantity_offered, date_submitted, name, civ_id
        FROM offer INNER JOIN user ON civ_id=user.id INNER JOIN item on item_id=item.id
        WHERE role='CIVILIAN' AND date_undertaken is NULL AND date_completed is NULL ORDER BY civ_id";

$result = $conn->query($sql);
if ($result->num_rows > 0)
    while($row = $result->fetch_assoc())
        $farr["offers_on"][] = array(
            "id" => intval($row["civ_id"]),
            "coo" => [floatval($row["latitude"]), floatval($row["longitude"])],
            "common_per_id" => $row["full_name"].", ".$row["phone"].", ",
            "special_per_id" => "[".$row["date_submitted"].", ".$row["name"].":".$row["quantity_offered"]."]"
            );

// Offers off
$sql = "SELECT civ.full_name as full_name, civ.phone as phone, civ.latitude as latitude,
        civ.longitude as longitude, quantity_offered, date_submitted, name, civ_id,
        rescuer.username as rescuer_username, date_undertaken
        FROM offer INNER JOIN user as civ ON civ_id=civ.id INNER JOIN item on item_id=item.id
        INNER JOIN rescuer_task on offer_id=offer.id
        INNER JOIN user as rescuer on rescuer.id=rescuer_id
        WHERE civ.role='CIVILIAN' AND rescuer.role='RESCUER'
            AND offer_id is NOT NULL AND date_undertaken is NOT NULL AND date_completed is NULL ORDER BY civ_id";

$result = $conn->query($sql);
if ($result->num_rows > 0)
    while($row = $result->fetch_assoc())
        $farr["offers_off"][] = array(
            "id" => intval($row["civ_id"]),
            "coo" => [floatval($row["latitude"]), floatval($row["longitude"])],
            "common_per_id" => $row["full_name"].", ".$row["phone"].", ",
            "special_per_id" => "[".$row["date_submitted"].", ".$row["rescuer_username"].", ".$row["date_undertaken"].", ".$row["name"].":".$row["quantity_offered"]."]"
            );

// Trucks loaded
$sql = "SELECT user.id as r_id, username, latitude, longitude, name, cargo.quantity as quant
FROM user LEFT JOIN cargo on user.id=rescuer_id INNER JOIN item on item_id=item.id
WHERE role='RESCUER' ORDER BY r_id";
$result = $conn->query($sql);
if ($result->num_rows > 0)
    while($row = $result->fetch_assoc())
        $farr["trucks_loaded"][] = array(
            "id" => intval($row["r_id"]),
            "coo" => [floatval($row["latitude"]), floatval($row["longitude"])],
            "common_per_id" => $row["username"].", ",
            "special_per_id" => "[".$row["name"].":".intval($row["quant"])."]"
            );

for ($i=0; $i < sizeof($farr["trucks_loaded"]); $i++) { 
    $sql = "SELECT rescuer_id FROM user INNER JOIN rescuer_task on user.id=rescuer_id
            WHERE role='RESCUER' AND user.id=".$farr["trucks_loaded"][$i]["id"];
    $result = $conn->query($sql);
    $status = ($result->num_rows > 0)?"active":"inactive";
    $farr["trucks_loaded"][$i]["common_per_id"] = $farr["trucks_loaded"][$i]["common_per_id"].$status.", ";
}


// Trucks empty
$sql = "SELECT user.id as r_id, username, latitude, longitude
FROM user LEFT JOIN cargo on user.id=rescuer_id
WHERE role='RESCUER' AND rescuer_id is NULL ORDER BY r_id";
$result = $conn->query($sql);
if ($result->num_rows > 0)
    while($row = $result->fetch_assoc())
        $farr["trucks_empty"][] = [floatval($row["latitude"]), floatval($row["longitude"]),
                                    $row["username"].", ", $row["r_id"]];

for ($i=0; $i < sizeof($farr["trucks_empty"]); $i++) { 
    $sql = "SELECT rescuer_id FROM user INNER JOIN rescuer_task on user.id=rescuer_id
            WHERE role='RESCUER' AND user.id=".$farr["trucks_empty"][$i][3];
    $result = $conn->query($sql);
    $status = ($result->num_rows > 0)?"active":"inactive";
    $farr["trucks_empty"][$i][2] = $farr["trucks_empty"][$i][2].$status;
}

// Base
$sql = "SELECT latitude, longitude FROM base";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $farr["base"] = [floatval($row["latitude"]), floatval($row["longitude"]), "Base"];
}

// Lines
$sql = "SELECT re.latitude as la1, re.longitude as lo1, civ.latitude as la2, civ.longitude as lo2
    FROM request INNER JOIN user as civ on civ.id=civ_id INNER JOIN rescuer_task on request_id=request.id
    INNER JOIN user as re on re.id=rescuer_id WHERE civ.role='CIVILIAN' AND re.role='RESCUER'
    UNION
    SELECT re.latitude as la1, re.longitude as lo1, civ.latitude as la2, civ.longitude as lo2
    FROM offer INNER JOIN user as civ on civ.id=civ_id INNER JOIN rescuer_task on offer_id=offer.id
    INNER JOIN user as re on re.id=rescuer_id WHERE civ.role='CIVILIAN' AND re.role='RESCUER'";

$result = $conn->query($sql);
if ($result->num_rows > 0)
    while($row = $result->fetch_assoc())
        $farr["lines"][] = [[floatval($row["la1"]), floatval($row["lo1"])],
                    [floatval($row["la2"]), floatval($row["lo2"])], "blue"];

$conn->close();
echo json_encode($farr, JSON_PRETTY_PRINT);
?>