<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();

require_once('../classes/dbh.classes.php');
require_once('../classes/updateInfo.classes.php');
require_once('../classes/updateInfoContr.classes.php');

// var_dump(session_id());

$rawData = file_get_contents('php://input');
$jsonData = json_decode($rawData, true);

if (!empty($jsonData)) {
    if (!isset($_SESSION['id'])) {
        echo json_encode(['error' => 'Session ID not found']);
        http_response_code(400);
        exit;
    }

    $name = $jsonData['name'];
    $surname = $jsonData['surname'];
    $date_of_birth = $jsonData['date_of_birth'];
    $address = $jsonData['address'];
    $profile_pic = $jsonData['profile_pic'];
    $biography = $jsonData['biography'];
    $account_id = $_SESSION['id'];

    $editInfo = new UpdateInfoContr($name, $surname, $date_of_birth, $address, $profile_pic, $biography, $account_id);

    //error handlers:
    $editInfo->addBiography();

    //Dati modificati:
    echo json_encode(['success' => 'Info successfully updated!']);
    http_response_code(201);
} else {
    echo json_encode(['error' => 'Invalid input']);
    http_response_code(400);
}
