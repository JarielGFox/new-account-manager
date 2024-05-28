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

// controlla che l'utente abbia effettuato il login
if (!isset($_SESSION['id'])) {
    echo json_encode(['error' => 'ID di sessione non trovato!']);
    http_response_code(400);
    exit;
}

$account_id = $_SESSION['id'];

//istanza di UpdateInfo() class
$updateInfo = new UpdateInfo();

//fetchiamo le user info
$userInfo = $updateInfo->getUserInfo($account_id);

//utente trovato
if ($userInfo) {
    echo json_encode($userInfo);
    http_response_code(200);
    // utente non trovato
} else {
    echo json_encode(['error' => 'No data found for this user']);
    http_response_code(404);
}
