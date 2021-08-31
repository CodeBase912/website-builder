<?php
// Headers

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

include_once '../models/database_config.php';
include_once '../models/users.php';

// Instantiate database & connect
$database = new Database();
$db = $database->connect();



// Get raw posted data
$data = json_decode(file_get_contents("php://input"), true);

// Instantiate user object
$user = new User($db);
$query = $data['username'];
print_r($user->getUser($query, 1));




// // Check if posted passwords match
// if ($data->password !== $data->confirmedPassword) {
//     // Return an passwords do not match response
// }
// else {
//     $user->username = $data->username;
//     $user->email = $data->email;
//     $user->password = $data->password;
//     $user->verified = 1;

//     // Create user
//     if ($user->create()) {
//         echo json_encode(array("message"=>"User created"));
//     }
//     else {
//         echo json_encode(array("message"=>"User not created"));
//     }
// }
