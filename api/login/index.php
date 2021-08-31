<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

include_once '../models/database_config.php';
include_once '../models/users.php';

// Instantiate the DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate the user object
$user = new User($db);

// Get raw posted data
$data = json_decode(file_get_contents("php://input"), true);

print_r($user->logInUser($data));
