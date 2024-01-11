<?php
// TEST what happens when civilians move
@include "../config_connection.php";

$farr = [];
$farr["requests_on"] = [];
$farr["requests_off"] = [];
$farr["offers_on"] = [];
$farr["offers_off"] = [];
$farr["trucks"] = [];
$farr["base"] = [];
$farr["lines"] = [];

    
    function get_ids($farr) {
        $ids=[];
        for ($i=0; $i < sizeof($farr); $i++) {
            $ids[] = $farr[$i][3];
        }

        $ids2=[];
        for ($i=0; $i < sizeof($ids); $i++) {
            if (in_array($ids[$i], $ids2)){

            } else {
            $ids2[] = $ids[$i];
            }
        }
        return $ids2;
    }

    function unique_records($farr, $ids) {
        $farr2 = [[]];   #farr2[0] = [int int str [list of strings]]

        $id_i = 0;   # ids index
        for ($i=0; $i < sizeof($farr); $i++) {
            if ($farr[$i][3]==$ids[$id_i]) {
                $farr2[$id_i][0] = $farr[$i][0];
                $farr2[$id_i][1] = $farr[$i][1];
                $farr2[$id_i][2] = $farr[$i][2];
                $farr2[$id_i][3][] = $farr[$i][4];
            } else {
                $id_i=$id_i+1;
                $farr2[] = [];
                $farr2[$id_i][0] = $farr[$i][0];
                $farr2[$id_i][1] = $farr[$i][1];
                $farr2[$id_i][2] = $farr[$i][2];
                $farr2[$id_i][3][] = $farr[$i][4];
            }
        }
        return $farr2;
    }

    function list_of_str($farr2) {
        $farr3 = [];   # farr3[0] = [int int [list of string]]
        for ($i=0; $i < sizeof($farr2); $i++) {
            $farr3[$i] = [$farr2[$i][0],$farr2[$i][1],[$farr2[$i][2]]];
            for ($j=0; $j < sizeof($farr2[$i][3]); $j++) { 
                $farr3[$i][2][] = $farr2[$i][3][$j];
            }
        }
        return $farr3;
    }

    function one_str($farr3) {
        $farr4 = [];   # farr4[0] = [int int str]  (str with list embedded)
        for ($i=0; $i < sizeof($farr3); $i++) { 
            $farr4[$i] = [$farr3[$i][0],$farr3[$i][1],""];
            for ($j=0; $j < sizeof($farr3[$i][2]); $j++) {
                if ($j>0)
                    $farr4[$i][2] = $farr4[$i][2].", [";
                $farr4[$i][2] = $farr4[$i][2].$farr3[$i][2][$j];
                if ($j>0)
                    $farr4[$i][2] = $farr4[$i][2]."]";
            }
        }
        return $farr4;
    }

    function fix_records($farr) {
        $ids = get_ids($farr);
        $farr2 = unique_records($farr, $ids);
        $farr3 = list_of_str($farr2);
        return one_str($farr3);
    }


// Requests on
$sql = "SELECT full_name, phone, latitude, longitude, num_people, date_submitted, name, civ_id
        FROM request INNER JOIN user ON civ_id=user.id INNER JOIN item on item_id=item.id
        WHERE role='CIVILIAN' AND date_undertaken is NULL AND date_completed is NULL ORDER BY civ_id";

$result = $conn->query($sql);
if ($result->num_rows > 0)
    while($row = $result->fetch_assoc())
        $farr["requests_on"][] = [floatval($row["latitude"]), floatval($row["longitude"]),
                    $row["full_name"].", ".$row["phone"],
                    intval($row["civ_id"]),
                    $row["date_submitted"].", ".$row["name"].", ".$row["num_people"]];

if (sizeof($farr["requests_on"])>0){
    $farr["requests_on"] = fix_records($farr["requests_on"]);
}

// Requests off
$sql = "SELECT civ.full_name, civ.phone, civ.latitude, civ.longitude, num_people, date_submitted,
            name, civ_id, rescuer.username as rescuer_username, date_undertaken
        FROM request INNER JOIN user as civ ON civ_id=civ.id INNER JOIN item on item_id=item.id
        INNER JOIN rescuer_task on request_id=request.id
        INNER JOIN user as rescuer on rescuer.id=rescuer_id
        WHERE civ.role='CIVILIAN' AND rescuer.role='RESCUER'
            AND request_id is NOT NULL AND date_undertaken is NOT NULL AND date_completed is NULL ORDER BY civ_id";

$result = $conn->query($sql);
if ($result->num_rows > 0)
    while($row = $result->fetch_assoc())
        $farr["requests_off"][] = [floatval($row["latitude"]), floatval($row["longitude"]),
                    $row["full_name"].", ".$row["phone"],
                    intval($row["civ_id"]),
                    $row["date_submitted"].", ".$row["name"].", ".$row["num_people"].
                    ", ".$row["rescuer_username"].", ".$row["date_undertaken"]];

if (sizeof($farr["requests_off"])>0){
    $farr["requests_off"] = fix_records($farr["requests_off"]);
}

// Offers on
$sql = "SELECT full_name, phone, latitude, longitude, quantity_offered, date_submitted, name, civ_id
        FROM offer INNER JOIN user ON civ_id=user.id INNER JOIN item on item_id=item.id
        WHERE role='CIVILIAN' AND date_undertaken is NULL AND date_completed is NULL ORDER BY civ_id";

$result = $conn->query($sql);
if ($result->num_rows > 0)
    while($row = $result->fetch_assoc())
        $farr["offers_on"][] = [floatval($row["latitude"]), floatval($row["longitude"]),
                    $row["full_name"].", ".$row["phone"],
                    intval($row["civ_id"]),
                    $row["date_submitted"].", ".$row["name"].", ".$row["quantity_offered"]];

if (sizeof($farr["offers_on"])>0){
    $farr["offers_on"] = fix_records($farr["offers_on"]);
}

// Offers off
$sql = "SELECT civ.full_name, civ.phone, civ.latitude, civ.longitude, quantity_offered, date_submitted,
            name, civ_id, rescuer.username as rescuer_username, date_undertaken
        FROM offer INNER JOIN user as civ ON civ_id=civ.id INNER JOIN item on item_id=item.id
        INNER JOIN rescuer_task on offer_id=offer.id
        INNER JOIN user as rescuer on rescuer.id=rescuer_id
        WHERE civ.role='CIVILIAN' AND rescuer.role='RESCUER'
            AND offer_id is NOT NULL AND date_undertaken is NOT NULL AND date_completed is NULL ORDER BY civ_id";

$result = $conn->query($sql);
if ($result->num_rows > 0)
    while($row = $result->fetch_assoc())
        $farr["offers_off"][] = [floatval($row["latitude"]), floatval($row["longitude"]),
                    $row["full_name"].", ".$row["phone"],
                    intval($row["civ_id"]),
                    $row["date_submitted"].", ".$row["name"].", ".$row["quantity_offered"].
                    ", ".$row["rescuer_username"].", ".$row["date_undertaken"]];

if (sizeof($farr["offers_off"])>0){
    $farr["offers_off"] = fix_records($farr["offers_off"]);
}

// Trucks
$sql = "SELECT user.id as r_id, username, latitude, longitude, name, cargo.quantity as quant
FROM user LEFT JOIN cargo on user.id=rescuer_id INNER JOIN item on item_id=item.id
WHERE role='RESCUER' ORDER BY r_id";
$result = $conn->query($sql);
if ($result->num_rows > 0)
    while($row = $result->fetch_assoc())
        $farr["trucks"][] = [floatval($row["latitude"]), floatval($row["longitude"]),
                    $row["username"].", active",
                    intval($row["r_id"]),
                    $row["name"].", ".$row["quant"]];

if (sizeof($farr["trucks"])>0){
    $farr["trucks"] = fix_records($farr["trucks"]);
}

$sql = "SELECT user.id as r_id, username, latitude, longitude
FROM user LEFT JOIN cargo on user.id=rescuer_id
WHERE role='RESCUER' AND rescuer_id is NULL ORDER BY r_id";
$result = $conn->query($sql);
if ($result->num_rows > 0)
    while($row = $result->fetch_assoc())
        $farr["trucks"][] = [floatval($row["latitude"]), floatval($row["longitude"]),
                    $row["username"].", inactive"];


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
// } else {
//     $stuff = file_get_contents("../../pages/admin/main/coords.json");
//     echo $stuff;
// }
?>