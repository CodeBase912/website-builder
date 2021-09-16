<?php
// This file contains the Users controller

include_once './models/database_config.php';
include_once './models/users.php';

class UserController {

    public $userModel;

    public function __construct() {
        // Instantiate the DB & connect
        $database = new Database();
        $db = $database->connect();
        $this->userModel = new User($db);
    }

    public function getInputData() {
        if (file_get_contents("php://input")) {
            return json_decode(file_get_contents("php://input"), true);
        }
        else {
            return false;
        }
    }

    /**
     * @method signUp - signs up the user
     * 
     * @param array $userData - an array that contains the user's 
     *                          email, username
     * 
     * 
     * @return array - an array that contains the result of signup process
     */
    public function signUp($userData) {
        $result = $this->userModel->signUpUser($userData);
        return $result[1];
    }

    /**
     * @method getSingleUser - gets a single user
     * 
     * @param array $userData - an array that contains the user's 
     *                          email, username or id
     * 
     * @return array - an array that contains the user's data and status of
     *                 the operation
     */
    public function getSingleUser($userData) {
        // Get the user. 2nd param is false => we do not want to return user's 
        // pwd
        $result = $this->userModel->getUser($userData, false);
        return $result;
    }

    /**
     * @method getAllUsers - gets all users in the DB
     * 
     * @return array - an array that contains the users' data and status of
     *                 the operation
     */
    public function getAllUsers() {
        // Get the user. 2nd param is false => we do not want to return user's 
        // pwd
        $result = $this->userModel->getAllUsers();
        return $result;
    }

    /**
     * @method logIn - logs in the user and returns the session
     *                 token
     * 
     * @param string $userData - the user's email or username
     * 
     * @return array - an array that contains the user's session 
     *                 token
     */
    public function logIn($userData) {
        $this->userModel->logInUser($userData);
    }

    /**
     * @method updateData - updates the user's account data
     * 
     * @param array $userData - an associative array where that contains the 
     *                          identifier of the user's data to update and 
     *                          the new data
     * 
     * @return array - an associative array containing the status of 
     *                 result of updating the user's account information
     */
    public function updateData($userData) {
        $result = $this->userModel->updateUserData($userData);
        return $result;
    }

    /**
     * @method closeConnection - closes the DB connection
     */
    public function closeConnection() {
        $this->userModel->conn = null;
    }
}