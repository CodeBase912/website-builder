<?php
// This will handle all user requests

require_once './controllers/Users.php';

set_exception_handler(function ($e) {
 $code = $e->getCode() ?: 400;
 header("Content-Type: application/json", false, $code);
 echo json_encode(["error" => $e->getMessage()]);
 exit;
});

$verb = $_SERVER['REQUEST_METHOD'];
$url_pieces = explode('/', $_SERVER['PHP_SELF']);

$user = new UserController;
$InputData = $user->getInputData();

// Handle the request according to the request method provided
switch ($verb) {
    case 'POST':
        // If the method is POST we sign up the user
        if ($InputData) {
            // Define the input validation rules
            $args = array(
                'username' => FILTER_SANITIZE_STRING,
                'email' => FILTER_VALIDATE_EMAIL,
                'password' => '',
                'confirmedPassword' => ''
            );
            // Sanitize the input
            $InputData = filter_var_array($InputData, $args);

            // Check if the input data is valid
            if (!$InputData['username']) {
                throw new Exception("Username is missing or invalid");
            }
            if (!$InputData['email']) {
                throw new Exception("Email is missing or invalid");
            }

            // Check if the password and confirmPassword match
            if ($InputData['password'] !== $InputData['confirmedPassword']) {
                throw new Exception('Passwords Do Not Match');
            }

            // Signup the user
            $signUpResult = $user->signUp($InputData);

            if ($signUpResult['error']) {
                throw new Exception($signUpResult['message'], $signUpResult['status']);
            }

            header("Content-Type: application/json", false, 200);
            echo json_encode(["success" => ["message" => $signUpResult['message']]]);
            $user->closeConnection();
            exit();
        }
        else {
            throw new Exception("No Input Data");
        }

        break;

    case 'GET':
        // If the method is GET we look for a user in the DB

        // Check if the request wants all users or a single user
        if (isset($InputData['type'])) {
            // Check if the request wants all user's or a single user
            if ($InputData['type'] === 'single') {
                // Define the input validation rules
                $args = array(
                    'username' => FILTER_SANITIZE_STRING,
                    'email' => FILTER_VALIDATE_EMAIL,
                    'id' => FILTER_VALIDATE_INT,
                );
                // Validate the input
                $InputData = filter_var_array($InputData, $args);

                // If the username was given lookup user by username
                if ($InputData['username']) {
                    $userData = $user->getSingleUser($InputData['username']);
                    // Check if there was an error
                    if ($userData['error']) {
                        // Theer was an error. Throw an exception with the error 
                        // message
                        throw new Exception($userData['message'], $userData['status']);
                    }
                    else {
                        // There was not error. Return a successful reponse
                        header("Content-Type: application/json", false, 200);
                        echo json_encode(["success" => ["message" => $userData['message'], "data" => $userData['data']]]);
                        $user->closeConnection();
                        exit();
                    }
                }
                else if ($InputData['email']) {
                    $userData = $user->getSingleUser($InputData['email']);
                    // Check if there was an error
                    if ($userData['error']) {
                        // Theer was an error. Throw an exception with the error 
                        // message
                        throw new Exception($userData['message'], $userData['status']);
                    }
                    else {
                        // There was not error. Return a successful reponse
                        header("Content-Type: application/json", false, 200);
                        echo json_encode(["success" => ["message" => $userData['message'], "data" => $userData['data']]]);
                        $user->closeConnection();
                        exit();
                    }
                }
                else if ($InputData['id']) {
                    $userData = $user->getSingleUser($InputData['id']);
                    // Check if there was an error
                    if ($userData['error']) {
                        // Theer was an error. Throw an exception with the error 
                        // message
                        throw new Exception($userData['message'], $userData['status']);
                    }
                    else {
                        // There was not error. Return a successful reponse
                        header("Content-Type: application/json", false, 200);
                        echo json_encode(["success" => ["message" => $userData['message'], "data" => $userData['data']]]);
                        $user->closeConnection();
                        exit();
                    }
                }
                else {
                    throw new Exception('Invalid Request');
                }
            }
            else if ($InputData['type'] === 'all') {
                // Get all the users
                $userData = $user->getAllUsers();
                // Check if there was an error
                if ($userData['error']) {
                    // Theer was an error. Throw an exception with the error 
                    // message
                    throw new Exception($userData['message'], $userData['status']);
                }
                else {
                    // There was not error. Return a successful reponse
                    header("Content-Type: application/json", false, 200);
                    echo json_encode(["success" => ["message" => $userData['message'], "data" => $userData['data']]]);
                    $user->closeConnection();
                    exit();
                }
            }
            else {
                throw new Exception('GET Request Type Not Supported');
            }
        }
        else {
            throw new Exception('GET Request Type Not Provided');
        }

        break;
    case 'PUT':
        // If the method is PUT we update a record in the user's table 
        // in the DB

        break;
    case 'DELETE':
        // If the method is DELETE we remove a user's account from the DB

        break;
    default:
        throw new Exception('Method Not Supported', 405);
}

// header("Content-Type: application/json", false, 200);
// echo json_encode(["data" => $InputData]);



