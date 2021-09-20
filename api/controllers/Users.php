<?php
// This file contains the Users controller

include_once './models/database_config.php';
include_once './models/user.php';

class UserController {

    public $userModel;

    public function __construct() {
        // Instantiate the DB & connect
        $database = new Database();
        $db = $database->connect();
        $this->userModel = new User($db);
    }

    /**
     * gets the body of the http request
     * 
     * @return array|bool an associative array
     */
    public function getInputData(): array|bool {
        if (file_get_contents("php://input")) {
            return json_decode(file_get_contents("php://input"), true);
        }
        else {
            return false;
        }
    }

    /**
     * signs up the user
     * 
     * @param array $userData  an array that contains the user's 
     *                         email, username, password and confirmed
     *                         password
     * 
     * @return array  an array that contains a success or error message 
     *                of the signup process
     */
    public function signUp(array $userData): array {
        $result = $this->userModel->signUpUser($userData);
        return $result[1];
    }

    /**
     * gets a single user
     * 
     * @param string $user  an string that contains the user's 
     *                      email, username or id
     * 
     * @return array  an associative array that contains an error 
     *                message or contains a success message and the 
     *                user's data
     */
    public function getSingleUser(string $userData): array {
        // Get the user. 2nd param is false => we do not want to return user's 
        // pwd
        $result = $this->userModel->getUser($userData, false);
        return $result;
    }

    /**
     * gets all users in the database
     * 
     * @return array  an associative array that contains an error 
     *                message or contains a success message and the 
     *                user's data
     */
    public function getAllUsers(): array {
        // Get the user. 2nd param is false => we do not want to return user's 
        // pwd
        $result = $this->userModel->getAllUsers();
        return $result;
    }

    /**
     * logs in the user and returns the session token (if successful)
     * 
     * @param array $userData  an associative array that contains a 
     *                         user's email or username and password
     * 
     * @return array  an associative array that contains an error 
     *                message or contains a success message and the 
     *                user's session token
     */
    public function logIn($userData) {
        $result = $this->userModel->logInUser($userData);
        return $result;
    }

    /**
     * logs out the user
     * 
     * @param string $userSessionToken  an associative array that contains a 
     *                                  uses's session token
     * 
     * @return array  an associative array that contains an error 
     *                message or contains a success message
     */
    public function logOut($userSessionToken) {
        $result = $this->userModel->logOutUser($userSessionToken);
        return $result;
    }

    /**
     * updates the user's account data
     * 
     * @param array $userData  an associative array that contains an 
     *                         identifier of the user and the new data 
     *                         to update
     * 
     * @return array  an associative array that contains an error 
     *                message or a success message
     */
    public function updateData(array $userData): array {
        $result = $this->userModel->updateUserData($userData);
        return $result;
    }

    /**
     * closes the database connection
     */
    public function closeConnection(): void {
        $this->userModel->conn = null;
    }
}