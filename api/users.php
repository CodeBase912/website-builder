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
$url_pieces = explode('/', $_SERVER['REQUEST_URI']);

$user = new UserController;
$InputData = $user->getInputData();

// Handle the request according to the request method provided
switch ($verb) {
    case 'POST':
        // If the method is POST we sign up the user
        if ($InputData) {
            // Check if the the request is to signup or login
            if (isset($url_pieces[4])) {
                // Check if the request it to signup or login
                if ($url_pieces[4] === 'signup') {
                    /**
                     * Expected structure of input:
                     * {
                     *     "username": "john", //
                     *     "email": "john@example.com",
                     *     "password": "12345", // username or email
                     *     "confirmedPassword": "12345"
                     * }
                     */
                    // 

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
                    // Check if there was an error
                    if ($signUpResult['error']) {
                        // There was an error, return error message
                        throw new Exception($signUpResult['message'], $signUpResult['status']);
                    }

                    // There was no error, the user was successfully signed up 
                    // Return success message
                    header("Content-Type: application/json", false, 200);
                    echo json_encode(["success" => ["message" => $signUpResult['message']]]);
                }
                else if ($url_pieces[4] === 'login') {
                    /**
                     * Expected structure of input:
                     * {
                     *     "identifier": "john", // username or email
                     *     "password": "12345"
                     * }
                     */
                    // 

                    // Define the input validation rules
                    $args = array(
                        'identifier' => FILTER_SANITIZE_STRING,
                        'password' => ''
                    );
                    // Validate the input
                    $InputData = filter_var_array($InputData, $args);

                    // Check if the correct data was provided
                    if (isset($InputData['identifier']) && isset($InputData['password'])) {
                        // Check if the in data is valid
                        if ($InputData['identifier'] && $InputData['password']) {
                            // Data is valid, login the user
                            $loginResult = $user->login($InputData);


                            // Check if there was an error
                            if ($loginResult['error']) {
                                // There was an error, return error message
                                throw new Exception($loginResult['message'], $loginResult['status']);
                            }

                            // There was no error, user was successfully signed up,
                            // Return success message and user data
                            header("Content-Type: application/json", false, 200);
                            echo json_encode(["success" => ["message" => $loginResult['message'], "data" => $loginResult['data']]]);
                        }
                        else {
                            throw new Exception('Invalid Request');
                        }
                    }
                    else {
                        throw new Exception('Invalid/Missing Input Keys');
                    }
                }
                else {
                    throw new Exception('Request Not Supported');
                }
            }
            else {
                throw new Exception('Request Not Supported');
            }

            
        }
        else {
            throw new Exception("No Input Data");
        }

        break;

    case 'GET':
        // If the method is GET we look for a user in the DB
        
        /**
         * Expected structure of input:
         * {
         *     "username": "james", // type
         * }
         */
        // 

        // Check if the request wants all users or a single user
        if (isset($url_pieces[4])) {
            // Check if the request wants all user's or a single user
            if ($url_pieces[4] === 'single') {
                if ($url_pieces[5]) {
                    // Lookup the user by id

                    // Validate the input
                    $InputData = filter_var($url_pieces[5], FILTER_VALIDATE_INT);
                    // Check if the input is valid
                    if (!$InputData) throw new Exception('Invalid Request');
                    
                    $userData = $user->getSingleUser($InputData);
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
                    }

                }
                else if ($InputData) {
                    // Lookup the user by email/username
                    
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
                        }
                    }
                    else {
                        throw new Exception('Request Not Supported');
                    }
                }
                else {
                    throw new Exception('Request Not Supported');
                }
            }
            else if ($url_pieces[4] === 'all') {
                // Get all the users
                $userData = $user->getAllUsers();
                // Check if there was an error
                if ($userData['error']) {
                    // There was an error. Throw an exception with the error 
                    // message
                    throw new Exception($userData['message'], $userData['status']);
                }
                else {
                    // There was not error. Return a successful reponse
                    header("Content-Type: application/json", false, 200);
                    echo json_encode(["success" => ["message" => $userData['message'], "data" => $userData['data']]]);
                }
            }
            else {
                throw new Exception('Request Not Supported');
            }
        }
        else {
            throw new Exception('Invalid Provided');
        }

        break;
    case 'PUT':
        // If the method is PUT we update a record in the user's table 
        // in the DB

        // Check if the input data is provided
        if (isset($url_pieces[4])) {
            if ($url_pieces[4] === 'update') {
                // Define the input validation rules
                $args = array(
                    'username' => FILTER_SANITIZE_STRING,
                    'email' => FILTER_VALIDATE_EMAIL,
                    'password' => '',
                    'confirmedPassword' => ''
                );

                /**
                 * Schema of input
                 * {
                 *  "userIdentifier": {
                 *                     "username": "james12" 
                 *                   },
                 * "newData": {
                 *              "username": "iamjames"
                 *            }
                 * }
                 */

                // Validate the input
                $identifier = filter_var_array($InputData['userIdentifier'], $args);
                $newData = filter_var_array($InputData['newData'], $args);
                $identifier = array_filter($identifier);
                $newData = array_filter($newData);

                // Check if the newData is valid
                if (count($newData) == 0 || !$newData[key($newData)]) {
                    throw new Exception('Invalid Update Data');
                }
                $InputData = ["userIdentifier" => $identifier, "newData" => $newData];

                // If the an identifier (is valid) and new data were given
                if (( (count($identifier) > 0 && key($InputData['userIdentifier']) === 'username') || (count($identifier) > 0 && key($InputData['userIdentifier']) === 'email') ) 
                && 
                ( key($InputData['newData']) === 'username' || (key_exists('password', $InputData['newData']) && key_exists('confirmedPassword', $InputData['newData'])) )) {
                    // Check if the username or email was given and lookup the user 
                    // accordingly
                    if (key($InputData['userIdentifier']) === 'username') {
                        // Username was given. Lookup user by username
                        $userData = $user->getSingleUser($InputData['userIdentifier']['username']);
                    }
                    else if (key($InputData['userIdentifier']) === 'email') {
                        // Username was given. Lookup user by username
                        $userData = $user->getSingleUser($InputData['userIdentifier']['email']);
                    }
                    // Check if there was an error
                    if ($userData['error']) {
                        // There was an error. Throw an exception with the error 
                        // message
                        throw new Exception($userData['message'], $userData['status']);
                    }

                    // There was no error therefore update the user's data
                    $userData = $user->updateData($InputData);
                    // Check if there was an error updating the user's data
                    if ($userData['error']) {
                        // There was an error. Throw an exception with the error 
                        // message
                        throw new Exception($userData['message'], $userData['status']);
                    }
                    else {
                        // There was no error updating the user's data, return a
                        // success message
                        header("Content-Type: application/json", false, $userData['status']);
                        echo json_encode(["success" => ["message" => $userData['message']]]);
                    }
                }
                else {
                    throw new Exception('Invalid Request');
                }
            }
            else {
                throw new Exception("Request Not Supported");
            }
        }
        else {
            throw new Exception('Request Not Supported');
        }

        break;
    case 'DELETE':
        // If the method is DELETE we remove a user's account from the DB

        // Check if the input data is provided
        if (isset($url_pieces[4])) {
            if ($url_pieces[4] === 'logout') {
                /**
                 * Expected structure of input:
                 * {
                 *     "token": "24c2030adf8ca560&cce9d26ea1a818e3bf2262b3ec8df95869753cf77c4ff2f861bf2f0db43bceb1"
                 * }
                 */

                // Define the input validation rules
                $args = array(
                    'token' => FILTER_SANITIZE_STRING
                );
                // Validate the input
                $InputData = filter_var_array($InputData, $args);

                if ($InputData && isset($InputData['token'])) {
                    // Logout the user
                    $userData = $user->logOut($InputData['token']);
                    // Check if there was an error updating the user's data
                    if ($userData['error']) {
                        // There was an error. Throw an exception with the error 
                        // message
                        throw new Exception($userData['message'], $userData['status']);
                    }
                    else {
                        // There was no error updating the user's data, return a
                        // success message
                        header("Content-Type: application/json", false, $userData['status']);
                        echo json_encode(["success" => ["message" => $userData['message']]]);
                    }
                }
                else {
                    throw new Exception('Invalid Request Data');
                }
            }
            else {
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
