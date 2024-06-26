<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

require_once('../classes/dbh.classes.php');

$response = [];

if (isset($_SESSION['username'])) {
    $response['status'] = 'loggedIn';
    $response['username'] = $_SESSION['username'];
} else {
    $response['status'] = 'notLoggedIn';
}

echo json_encode($response);
