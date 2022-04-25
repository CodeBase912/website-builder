<?php

/** 
 * The user class will hold the properties and methods that involve the user
 * 
 * Properties:
 * @property object $conn  The database connection
 * 
 * @property string $searchQuery  The string to look for in the database 
 *                             (a parameter of the getUser() method)
 * 
 * @property string $table  A sting value of the database table that contains 
 *                     user account information
 * 
 * @property string $sessionTable  A sting value of the database table that 
 *                            contains user session information
 * 
 * @property string $username  User's username
 * 
 * @property string $email  User's email
 * 
 * @property string $password  User's password
 * 
 * @property boolean $verified  Represents whether the user's email has been 
 *                         verified. 1 => Verified ; 0 => Not Verified
 * 
 * @property integer $modified_at  Last modified date of the user's account
 * 
*/
class User {
    // DB Stuff
    private $conn;
    private $table = 'members';
    private $sessionTable = 'loggedinusers';

    // Post Properties
    private $searchQuery;
    public $username;
    public $email;
    public $password;
    public $verified;
    public $modified_at;

    // Constructor
    public function __construct($db) {
        $this->conn = $db;
    }

    // Get Single User Method
    /** 
     * gets a single user from the database
     * 
     * @param string $user  a string that contains the user's 
     *                      email, username or id
     * 
     * @param boolean|null $returnPassword  represents whether to return the user's
     *                                      password or not:
     *                                      (true => return password) and
     *                                      (false => do not return password)
     * 
     * @return array  an associative array that contains an error 
     *                message or contains a success message and the 
     *                user's data
    */
    public function getUser(string $user, bool|null $returnPassword): array {
        // First clean the input & set the searchQuery
        $this->searchQuery = htmlspecialchars(strip_tags($user));
        // Check whether searchQuery is an email or not
        if (!filter_var($this->searchQuery, FILTER_VALIDATE_EMAIL)) {
            // searchQuery is not an email address
            // Search by username

            // Create the query
            $query = 'SELECT id, username, email, password, verified, mod_timestamp FROM ' . $this->table . ' WHERE username=:username OR email=:email OR id=:id';
            // Create the prepared statement
            $stmt = $this->conn->prepare($query);
            // Bind the parameter to the placeholder
            $stmt->bindParam('username', $this->searchQuery);
            $stmt->bindParam('email', $this->searchQuery);
            $stmt->bindParam('id', $this->searchQuery);
            // Execute the query
            $stmt->execute();
            // Get the result
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($result) {
                // The user is exists in database

                // Set properties
                $this->username = $result['username'];
                $this->email = $result['email'];
                $this->password = $result['password'];
                $this->verified = $result['verified'];
                $this->modified_at = $result['mod_timestamp'];


                // Check if the user's password should be returned
                if ($returnPassword === true) {
                    // Return the user's password
                    // Remove "password" property from the $result array
                    $result = array("id" => $result['id'], "username"=>$result['username'], "email"=>$result['email'], "password"=>$result['password'], "verified"=>$result['verified'], "last_updated"=>$result['mod_timestamp']);
                }
                else {
                    // Do not return the user's password
                    // Remove "password" property from the $result array
                    $result = array("id" => $result['id'], "username"=>$result['username'], "email"=>$result['email'], "verified"=>$result['verified'], "last_updated"=>$result['mod_timestamp']);
                }

                // Return the result
                return array("status"=>200, "error"=>false, "message"=>"User found", "search_by"=>"username", "data"=>$result);
            }
            else {
                // The user doe not exists in database
                return array("status"=>404, "error"=>true, "message"=>"User not found", "search_by"=>"username", "data"=>"");
            }
        }
        else {
            // searchQuery is an email address
            // Search by email

            // Create the query
            $query = 'SELECT id, username, email, password, verified, mod_timestamp FROM ' . $this->table . ' WHERE email=?';
            // Create the prepared statement
            $stmt = $this->conn->prepare($query);
            // Bind the parameter to the placeholder
            $stmt->bindParam(1, $this->searchQuery);
            // Execute the query
            $stmt->execute();
            // Get the result
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($result) {
                // The user is exists in database

                // Set properties
                $this->username = $result['username'];
                $this->email = $result['email'];
                $this->password = $result['password'];
                $this->verified = $result['verified'];
                $this->modified_at = $result['mod_timestamp'];

                // Check if the user's password should be returned
                if ($returnPassword === true) {
                    // Return the user's password
                    // Remove "password" property from the $result array
                    $result = array("id" => $result['id'], "username"=>$result['username'], "email"=>$result['email'], "password"=>$result['password'], "verified"=>$result['verified'], "last_updated"=>$result['mod_timestamp']);
                }
                else {
                    // Do not return the user's password
                    // Remove "password" property from the $result array
                    $result = array("id" => $result['id'], "username"=>$result['username'], "email"=>$result['email'], "verified"=>$result['verified'], "last_updated"=>$result['mod_timestamp']);
                }

                // Return the result
                return array("status"=>200, "error"=>false, "message"=>"User found", "search_by"=>"email", "data"=>$result);
            }
            else {
                // The user does not exists in database
                return array("status"=>404, "error"=>true, "message"=>"User not found", "search_by"=>"email", "data"=>"");
            }
        }
    }

    // Get All Users
    /** 
     * gets a all users in the database
     * 
     * @return array  an associative array that contains an error 
     *                message or contains a success message and the 
     *                user's data
    */
    public function getAllUsers(): array {
        // Define the query
        $query = 'SELECT username, email, verified, mod_timestamp  FROM ' . $this->table;
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Execute query
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        // Check if there are any results
        if ($result) {
            // Get the result
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                array_push($result, $row);
            }
            return array("status"=>200, "error"=>false, "message"=>"Users Found", "data"=>$result);
        }
        else { 
            // There are no users in the DB
            return array("status"=>404, "error"=>true, "message"=>"No Users Found", "data"=>"");
        }
    }

    public function isLoggedIn(string $token, int $userID): array {
        // Get the selector from the sessionToken variable
        // Find the position of the '.' character in the sessionToken variable
        $pos = strpos($token, "&", 0);
        // Get the selector from the sessionToken variable
        $selector = substr($token, 0, $pos);
        $selector = trim($selector);

        $result = $this->getUserSession($selector);
        // Check if there are results
        if (!$result['error']) {
            // The user has a session open

            // Verify that the correct user is being authenticated
            $userData = $this->getUser(strval($userID), false);
            // Check if there is no user found
            if ($userData['error']) {
                // The data provided is invalid
                return array("status"=>403, "error"=>true, "message"=>"Login required");
            }
            // Check if the found user not correct
            if ($userData['data']['email'] != $result['data']['email']) {
                // The data provided is invalid
                return array("status"=>403, "error"=>true, "message"=>"Login required");
            }

            // Validate if the token is correct    
            $activeToken = substr($token, $pos + 1);
            // Check if $activeToken is not hexidecimal
            if (!ctype_xdigit($activeToken)) {
                // The token provided is invalid
                return array("status"=>403, "error"=>true, "message"=>"Login required");
            }
            if (password_verify(hex2bin($activeToken), $result['data']['sessionToken'])) {
                // Return the result
                return array("status"=>200, "error"=>false, "message"=>"User authentication successful"); 
            }
            else {
                // The token provided is invalid
                return array("status"=>403, "error"=>true, "message"=>"Login required");
            }
        }
        else {
            // The user does not have an open session
            return array("status"=>403, "error"=>true, "message"=>"Login required");
        }

    }

    // Get User Session Method
    /** 
     * gets the user's session data
     * 
     * @param string $user  the user's session token or username or
     *                      email
     * 
     * @param boolean|null $findByToken  represents whether to find the user's
     *                                   session data by the session token or not:
     *                                   (true => find by token) and
     *                                   (false => find by username)
     * 
     * @return array  an associative array that contains an error 
     *                message or contains a success message
     *
    */
    public function getUserSession(string $user): array {
        // Create query
        $query = 'SELECT * FROM ' . $this->sessionTable . ' WHERE username = :username OR email = :email OR sessionSelector = :selector';
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Bind the parameter to the placeholder
        $stmt->bindParam(':username', $user);
        $stmt->bindParam(':email', $user);
        $stmt->bindParam(':selector', $user);
        // Execute the query
        $stmt->execute();
        
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        // Check if there are results
        if ($result) {
            // The user has a session open
            // Return the result
            return array("status"=>200, "error"=>false, "message"=>"User Session Found", "data"=>$result); 
        }
        else {
            // The user does not have an open session
            return array("status"=>404, "error"=>true, "message"=>"User Session Not Found");
        }
    }

    // Signup User Method
    /** 
     * signs up the user
     * 
     * @param array $user  an array that contains the user's 
     *                     email, username, password and confirmed
     *                     password
     * 
     * @return array  an array that contains a success or error message 
     *                of the signup process
    */
    public function signUpUser(array $user): array {
        // First clean the data
        $this->username = htmlspecialchars(strip_tags($user['username']));
        $this->email = htmlspecialchars(strip_tags($user['email']));
        $this->password = htmlspecialchars(strip_tags($user['password']));
        $this->password = 
        password_hash($this->password, PASSWORD_DEFAULT);
        $this->verified = htmlspecialchars(strip_tags($this->verified));
        // Define the SQL query
        $query = 'SELECT username, email, verified, mod_timestamp  FROM ' . $this->table . ' WHERE username = :username OR email = :email';
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Bind the parameters to the named placeholders
        $stmt->bindParam(':username', $user['username']);
        $stmt->bindParam(':email', $user['email']);
        // Execute query
        $stmt->execute();
        // Collect the result
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        // Check if there are any results
        if ($result) {
            // There is a match
            if ($result['username'] == $user['username']) {
                return [false, array("status"=>400, "error"=>true, "message"=>"Username Not Available!")]; // Status code 409 => Conflict
            }
            else if ($result['email'] == $user['email']) {
                return [false, array("status"=>400, "error"=>true, "message"=>"Email Not Available")]; // Status code 409 => Conflict
            }
        }
        else { 
            // There are no users in the DB

            // Create query
            $query = 'INSERT INTO ' . $this->table . ' (username, email, password, verified, mod_timestamp) VALUES (:username, :email, :password, :verified, :mod_timestamp)';
            // Prepare statement
            $stmt = $this->conn->prepare($query);
            // Bind the parameters to the named placeholders
            $currentUnixTime = time();
            $verifired = 0;
            $stmt->bindParam(':username', $this->username);
            $stmt->bindParam(':email', $this->email);
            $stmt->bindParam(':password', $this->password);
            $stmt->bindParam(':verified', $verifired);
            $stmt->bindParam(':mod_timestamp', $currentUnixTime);
            // Execute the query
            if ($stmt->execute()) {
                return [true, array("status"=>201, "error"=>false, "message"=>"User Account Created")]; // Status code 201 => Created
            }
            else {
                // Print error if something goes wrong
                return [false, array("status"=>417, "error"=>true, "message"=>"Error: ". $stmt->error)]; // Status code 417 => Expectation Failed
            }
        }
    }

    // Login User Method
    /** 
     * logs in the user and returns the session token (if successful)
     * 
     * @param array $user  an associative array that contains a user's email or
     *                     username and password
     * 
     * @return array  an associative array that contains an error 
     *                message or contains a success message and the 
     *                user's session token
    */
    public function logInUser(array $user): array {
        $userData = $this->getUser($user['identifier'], true);
        // Check if the user is in the database
        if (!$userData['error']) {
            // User is in the database
            // Check if the password the user provided matches the one in the database
            if (!password_verify($user['password'], $userData['data']['password'])) {
                // The passwords do not match
                return array("status" => 400, "error" => true, "message" => "Invalid Username/Email And Password Combination");
            }
            else {
                // The passwords match

                // Generate the session tokens
                /**
                 * @var string $selector  a string of cryptographically secure
                 *                        random bytes (converted to a hexidecimal 
                 *                        representation) that will be used to 
                 *                        identify the user's session token in the
                 *                        database. This is done to prevent 
                 *                        against timing attacks 
                 */
                $selector = bin2hex(random_bytes(8));
                $token = random_bytes(32); // The session token
                $expires = time() + 60 * 30; // Expires in 30 minutes

                // Get the user's session data
                $session = $this->getUserSession($userData['data']['email']);

                // Check if the user has an open session
                if (!$session['error']) {
                    // The user has an open session

                    $currentTime = time();
                    // Check if the user's session has expired
                    if ($currentTime > $session['data']['sessionExpires']) {
                        // User's session has expired

                        // Delete the current session in the database
                        // Create the query
                        $query = 'DELETE FROM ' . $this->sessionTable . ' WHERE username = :username OR email = :email';
                        // Prepare statement
                        $stmt = $this->conn->prepare($query);
                        // Bind the parameter to the placeholder
                        $stmt->bindParam(":username", $userData['data']['username']);
                        $stmt->bindParam(":email", $userData['data']['email']);
                        // Execute the query
                        $stmt->execute();

                        // Then create a new session data in the database (i.e. login the user)
                        // Create the query
                        $query = 'INSERT INTO ' . $this->sessionTable . ' (username, email, sessionSelector, sessionToken, sessionExpires) VALUES (:username, :email, :sessionSelector, :sessionToken, :sessionExpires)';
                        // Prepare statement
                        $stmt = $this->conn->prepare($query);
                        // Bind the parameters to the named place holders
                        $hasedToken = password_hash($token, PASSWORD_DEFAULT);
                        $stmt->bindParam(':username', $userData['data']['username']);
                        $stmt->bindParam(':email', $userData['data']['email']);
                        $stmt->bindParam(':sessionSelector', $selector);
                        $stmt->bindParam(':sessionToken', $hasedToken);
                        $stmt->bindParam(':sessionExpires', $expires);
                        // Execute the query
                        $stmt->execute();

                        // Set the result
                        $result = array("id" => $userData['data']['id'], "username" => $userData['data']['username'], "email" => $userData['data']['email'], "token" => $selector."&".bin2hex($token));

                        // Return the result
                        return array("status" => 201, "error" => false, "message" => "User Successfully Logged In", "data" => $result);
                    }
                    else {
                        // User's session is still in effect

                        $expires = time() + 30 * 60; // expires in 30 minutes
                        // Update the user's session expiration date
                        // Create query
                        $query = 'UPDATE ' . $this->sessionTable . ' SET sessionSelector = :sessionSelector, sessionToken = :sessionToken, sessionExpires = :sessionExpires WHERE username = :username OR email = :email';
                        // Preare statement
                        $stmt = $this->conn->prepare($query);
                        // Bind the parameters to the named placeholders
                        $hasedToken = password_hash($token, PASSWORD_DEFAULT);
                        $stmt->bindParam(":sessionSelector", $selector);
                        $stmt->bindParam(":sessionToken", $hasedToken);
                        $stmt->bindParam(":sessionExpires", $expires);
                        $stmt->bindParam(":username", $userData['data']['username']);
                        $stmt->bindParam(":email", $userData['data']['email']);
                        // Execute the statement
                        $stmt->execute();

                        // Set the result
                        $result = array("id" => $userData['data']['id'], "username" => $userData['data']['username'], "email" => $userData['data']['email'], "token" => $selector."&".bin2hex($token));

                        // Return the result
                        return array("status" => 201, "error" => false, "message" => "User Successfully Logged In", "data" => $result);
                    }
                }
                else {
                    // The user does not have an open session

                    // Then create a new session data in the database (i.e. login the user)
                    
                    // Create the query
                    $query = 'INSERT INTO ' . $this->sessionTable . ' (username, email, sessionSelector, sessionToken, sessionExpires) VALUES (:username, :email, :sessionSelector, :sessionToken, :sessionExpires)';
                    // Prepare statement
                    $stmt = $this->conn->prepare($query);
                    // Bind the parameters to the named place holders
                    $hasedToken = password_hash($token, PASSWORD_DEFAULT);
                    $stmt->bindParam(':username', $userData['data']['username']);
                    $stmt->bindParam(':email', $userData['data']['email']);
                    $stmt->bindParam(':sessionSelector', $selector);
                    $stmt->bindParam(':sessionToken', $hasedToken);
                    $stmt->bindParam(':sessionExpires', $expires);
                    // Execute the query
                    $stmt->execute();

                    // Set the result
                    $result = array("id" => $userData['data']['id'], "username" => $userData['data']['username'], "email" => $userData['data']['email'], "token" => $selector."&".bin2hex($token));

                    // Return the result
                    return array("status" => 201, "error" => false, "message" => "User Successfully Logged In", "data" => $result);
                }

            }
        }
        else {
            // User is not in the database, return error message
            return array("status"=>404, "error"=>true, "message"=>"Invalid Username/Email And Password Combination");
        }
    }

    // Logout User Method
    /** 
     * logs out the user
     * 
     * @param string $userSessionToken  an associative array that contains a 
     *                                  uses's session token
     * 
     * @return array  an associative array that contains an error 
     *                message or contains a success message
    */
    public function logOutUser(string $userSessionToken) {
        // Get the selector from the token
        try {
            $tokens = explode('&', $userSessionToken);
        } catch (Exception $error) {
            return array("status" => 400, "error" => true, "message" => $error->getMessage());
        }
        
        $selector = $tokens[0];
        $token = hex2bin($tokens[1]);

        // Get the user's session
        $session = $this->getUserSession($selector);

        // Check if the user has a session
        if ($session['error']) {
            // User has no session, return with error message
            return $session;
        }

        // User has a session
        // Check if the tokens match
        if (!password_verify($token, $session['data']['token'])) {
            // Session tokens do not match, return with error message
            return array("status"=>401, "error"=>true, "message"=>"Invalid Token");
        }

        // Session tokens match, logout the user

        // Delete the user's session
        // Create query
        $query = 'DELETE FROM ' . $this->sessionTable . ' WHERE sessionSelector = :selector';
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Bind the parameter to the placeholder
        $stmt->bindParam(':sessionSelector', $session['data']['selector']);
        // Execute the query
        $stmt->execute();

        // User has been logged out
        // Return the result
        return array("status"=>200, "error"=>false, "message"=>"User Successfully Logged Out"); 
    }

    // Update User Data Method
    /** 
     * updates user's account information
     * 
     * @param array $user  an associative array that contains an 
     *                     identifier of the user and the new data to
     *                     update
     * 
     * @return array  an associative array that contains an error 
     *                message or a success message
    */
    public function updateUserData(array $user):array {

        // Check if the new username/email is not taken
        if (key($user['newData']) != 'password') {
            $dataCheck = $this->getUser($user['newData'][key($user['newData'])], false);
            // Check if there was an error updating the user's data
            if (!$dataCheck['error']) {
                // There was an error. Throw an exception with the error 
                // message
                if (key($user['newData']) == 'email') {
                    return array("status"=>400, "error"=>true, "message"=>"Email Not Available");
                }
                else if (key($user['newData']) == 'username') {
                    return array("status"=>400, "error"=>true, "message"=>"Username Not Available");
                }
            }
        }

        // Update the user's data
        $query = 'UPDATE ' . $this->table . ' SET ' . key($user['newData']) . ' = :newData WHERE ' . key($user['userIdentifier']) . ' = :identifier';
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Bind the parameter to the placeholder
        $stmt->bindParam(':newData', $user['newData'][key($user['newData'])]);
        $stmt->bindParam(':identifier', $user['userIdentifier'][key($user['userIdentifier'])]);
        // Execute the query
        if ($stmt->execute()) {
            // User's data was successfully update, return success message
            return array("status"=>202, "error"=>false, "message"=>"Updated Successfully");
        }
        else {
            // Something went wrong
            return array("status"=>417, "error"=>true, "message"=>"Something Went Wrong");
        }

    }
}