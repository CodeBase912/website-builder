<?php
// This will handle all user requests

require_once './controllers/Users.php';

// Fixing the CORS error bug
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET,POST,OPTIONS,DELETE,PUT');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
// header("Access-Control-Allow-Headers: Content-Type, Accept, sec-ch-ua, sec-ch-ua-mobile, sec-ch-ua-platform, User-Agent");

set_exception_handler(function ($e) {
 $code = $e->getCode() ?: 400;
//  header("Content-Type: application/json", false, $code);
 echo json_encode(["error" => $e->getMessage()]);
 exit;
});

$verb = $_SERVER['REQUEST_METHOD'];
$url_pieces = explode('/', $_SERVER['REQUEST_URI']);

$user = new UserController;
$InputData = $user->getInputData();

// Handle the request according to the request method provided
switch ($verb) {
    case 'GET':
        if (isset($url_pieces[4]) && count($url_pieces) <= 5) {
            // Check whether the user id provided is an integer
            if (filter_var($url_pieces[4], FILTER_VALIDATE_INT)) {
                // User id provided is an integer
                $headers = apache_request_headers();
                $token = 0;
                foreach($headers as $header => $value) {
                    if ($header === "Authorization") {
                        $token = $value;
                    }
                }
                // Check if the token is provided
                if ($token) {
                    // Token is provided
                    $token = explode(" ", $token);
                    // Authenticate the user
                    $authResult = $user->isLoggedIn($token[1], intval($url_pieces[4]));
                    // Check if there was an error
                    if ($authResult['error']) {
                        // There was an error, return error message
                        throw new Exception($authResult['message'], $authResult['status']);
                    }
                    
                    // There was no error, user was successfully authenticated,
                    // Return success message and user data
                    header("Content-Type: application/json", false, 200);
                    echo json_encode(["success" => ["message" => $authResult['message']]]);
                }
                else {
                    // Token is missing
                    throw new Exception("Authorization token missing");
                }
            }
            else {
                // User id provided is not an integer
                throw new Exception('Request Not Supported');
            }
        }
        else {
            throw new Exception('Request Not Supported');
        }
        break;
    default: 
        throw new Exception('Method Not Supported', 405);
}