<?php
class User {
    /** 
     * The user class will hold the properties and methods that involve the user
     * 
     * Properties:
     * @var object    $conn - The database connection
     * @param string  $searchQuery - The string to look for in the database (a parameter of the getUser() method)
     * @var string    $table - A sting value of the database table that contains user account information
     * @var string    $sessionTable - A sting value of the database table that contains user session information
     * @var string    $username - User's username
     * @var string    $email - User's email
     * @var string    $password - User's password
     * @var boolean   $verified - Represents whether the user's email has been verified. 1 => Verified ; 0 => Not Verified
     * @var timestamp $modified_at - Last modified date of the user's account
     * 
    */


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

    // Get User Method
    public function getUser($user, $returnPassword) {
        /** 
         * @method getUser()
         * 
         * @param string $user - a string that represents an email address or username to look
         *                       look up in the database
         * 
         * @param boolean $returnPassword - represents whether to return the user's password or not.
         *                                  true => return password
         *                                  false => do not return password
         * 
         * @var string $query - MySQL query statement
         * 
         * @var object $stmt - The PDO::Statement object
         * 
         * @return array $result  an associative array containing the results of the search. Note
         *                         that the "error" property of the array represents how the result 
         *                         "message" property should be displayed in the UI on the front end
         * 
         * @access public
        */

        // First clean the input & set the searchQuery
        $this->searchQuery = htmlspecialchars(strip_tags($user));
        // Check whether searchQuery is an email or not
        if (!filter_var($this->searchQuery, FILTER_VALIDATE_EMAIL)) {
            // searchQuery is not an email address
            // Search by username

            // Create the query
            $query = 'SELECT username, email, password, verified, mod_timestamp FROM ' . $this->table . ' WHERE username=?';
            // Create the prepared statement
            $stmt = $this->conn->prepare($query);
            // Bind the parameter to the placeholder
            $stmt->bindParam(1, $this->searchQuery);
            // Execute the query
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                // The user is exists in database
                // Get the result
                $result = $stmt->fetch(PDO::FETCH_ASSOC);

                // Set properties
                $this->username = $result['username'];
                $this->email = $result['email'];
                $this->password = $result['password'];
                $this->verified = $result['verified'];
                $this->modified_at = $result['mod_timestamp'];


                // Check if the user's password should be returned
                if ($returnPassword) {
                    // Return the user's password
                    // Remove "password" property from the $result array
                    $result = array("username"=>$result['username'], "email"=>$result['email'], "password"=>$result['password'], "verified"=>$result['verified'], "last_updated"=>$result['mod_timestamp']);
                }
                else {
                    // Do not return the user's password
                    // Remove "password" property from the $result array
                    $result = array("username"=>$result['username'], "email"=>$result['email'], "verified"=>$result['verified'], "last_updated"=>$result['mod_timestamp']);
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
            $query = 'SELECT username, email, password, verified, mod_timestamp FROM ' . $this->table . ' WHERE email=?';
            // Create the prepared statement
            $stmt = $this->conn->prepare($query);
            // Bind the parameter to the placeholder
            $stmt->bindParam(1, $this->searchQuery);
            // Execute the query
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                // The user is exists in database
                // Get the result
                $result = $stmt->fetch(PDO::FETCH_ASSOC);

                // Set properties
                $this->username = $result['username'];
                $this->email = $result['email'];
                $this->password = $result['password'];
                $this->verified = $result['verified'];
                $this->modified_at = $result['mod_timestamp'];

                // Check if the user's password should be returned
                if ($returnPassword) {
                    // Return the user's password
                    // Remove "password" property from the $result array
                    $result = array("username"=>$result['username'], "email"=>$result['email'], "password"=>$result['password'], "verified"=>$result['verified'], "last_updated"=>$result['mod_timestamp']);
                }
                else {
                    // Do not return the user's password
                    // Remove "password" property from the $result array
                    $result = array("username"=>$result['username'], "email"=>$result['email'], "verified"=>$result['verified'], "last_updated"=>$result['mod_timestamp']);
                }

                // Return the result
                return array("status"=>200, "error"=>false, "message"=>"User found", "search_by"=>"email", "data"=>$result);
            }
            else {
                // The user doe not exists in database
                return array("status"=>404, "error"=>true, "message"=>"User not found", "search_by"=>"email", "data"=>"");
            }
        }
    }

    // Get User Session Method
    public function getUserSession($user, $findByToken) {
        /** 
         * @method getUserSession()
         * 
         * @param string $user - May be either a user's selector token (i.e. a string of cryptographically 
         *                       secure random bytes) or the user's email.
         * 
         * @param boolean $findByToken - represents whether to find the user's session data by the session 
         *                               token or not.
         *                               true => find by token
         *                               false => do not find by token (i.e. find by username)
         * 
         * @var string $query - MySQL query statement
         * 
         * @var object $stmt - The PDO::Statement object
         * 
         * @return array $result - an associative array that holds the user's session data. Note
         *                         that the "error" property of the array represents how the result 
         *                         "message" property should be displayed in the UI on the front end
         * 
         * @access public
         *
        */

        
        // Check whether searchQuery is an email or not
        if (!filter_var($user, FILTER_VALIDATE_EMAIL)) {
            // The $user parameter is a token (not an email).

            /** Check if the @param $findByToken is set to true (i.e. true => 1) */
            if ($findByToken) {
                // Look for the user's session data using the token
    
                // Create query
                $query = 'SELECT * FROM ' . $this->sessionTable . ' WHERE sessionSelector=?';
            }
            else {
                // Look for the user's session data using the email

                // Get users email
                $userData = $this->getUser($user['user'], 0);
                $user = $userData['data']['email'];

                // Create query
                $query = 'SELECT * FROM ' . $this->sessionTable . ' WHERE userEmail=?';
            }
        }
        else {
            // The $user parameter is an email. Therefore look for the user's session data using the 
            // user's email

            // Create query
            $query = 'SELECT * FROM ' . $this->sessionTable . ' WHERE userEmail=?';
        }

        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Bind the parameter to the placeholder
        $stmt->bindParam(1, $user);
        // Execute the query
        $stmt->execute();
        
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        // Check if there are results
        if ($stmt->rowCount() > 0) {
            // The user has a session open
            // Collect the result
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            // Return the result
            return array("status"=>200, "error"=>false, "message"=>"User session found", "data"=>$result); 
        }
        else {
            // The user does not have an open session
            return array("status"=>404, "error"=>true, "message"=>"User session not found", "data"=>"");
        }
    }

    // Signup User Method
    public function signUpUser() {
        /** 
         * @method signUpUser()
         * 
         * @var string $query - MySQL query statement
         * 
         * @var object $stmt - The PDO::Statement object
         * 
         * @return array $result - an associative array containing the status of the result of
         *                         singing in the user
         * 
         * @access public
        */

        // First clean the data
        $this->username = htmlspecialchars(strip_tags($this->username));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = htmlspecialchars(strip_tags($this->password));
        $this->password = 
        password_hash($this->password, PASSWORD_DEFAULT);
        $this->verified = htmlspecialchars(strip_tags($this->verified));

        // Check if the username or email is taken
        // Create query
        $query = 'SELECT username, email FROM ' . $this->table . ' WHERE username = :username OR email = :email ';
        // Prepared statement
        $stmt = $this->conn->prepare($query);
        // Bind the parameters to the named placeholders
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':email', $this->email);
        // Execute the statement
        $stmt->execute();
        // Determine if there are any matches
        if ($stmt->rowCount() > 0) {
            // There is a match
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($result['username'] == $this->username) {
                return [false, array("status"=>409, "error"=>true, "message"=>"Username is not available!")]; // Status code 409 => Conflict
            }
            else if ($result['email'] == $this->email) {
                return [false, array("status"=>409, "error"=>true, "message"=>"Email is not available!")]; // Status code 409 => Conflict
            }
        }
        else {
            // There are no matches therefore insert the user in the database
            // Create query
            $query = 'INSERT INTO ' . $this->table . ' SET username = :username, email = :email, password = :password, verified = :verified';
            // Prepare statement
            $stmt = $this->conn->prepare($query);
            // Bind the parameters to the named placeholders
            $stmt->bindParam(':username', $this->username);
            $stmt->bindParam(':email', $this->email);
            $stmt->bindParam(':password', $this->password);
            $stmt->bindParam(':verified', $this->verified);
            // Execute the query
            if ($stmt->execute()) {
                return [true, array("status"=>201, "error"=>false, "message"=>"User account created!")]; // Status code 201 => Created
            }
            else {
                // Print error if something goes wrong
                return [false, array("status"=>417, "error"=>true, "message"=>"Error: ". $stmt->error)]; // Status code 417 => Expectation Failed
            }
        }
        
    }

    // Login User Method
    public function logInUser($user) {
        /** 
         * @method logInUser()
         * 
         * @param array $user - an associative array that contains a user property (may be an email 
         *                      address/username), to look up in the database, and a password property
         * 
         * @var string $selector - a string of cryptographically secure random bytes (converted to a hexidecimal
         *                         representation) that will be used to identify the user's session token in the
         *                         database. This is done to prevent against timing attacks
         * 
         * @var string $token - the session token. It is string of cryptographically secure random bytes
         * 
         * @var int $expires - The expiration date of the token (in UNIX time) 
         * 
         * @var array $session - an array that holds the user's session data 
         * 
         * @var string $query - MySQL query statement
         * 
         * @var object $stmt - The PDO::Statement object
         * 
         * 
         * 
         * @return array $result - an associative array containing the status of the result of
         *                         loggin in the user
         * 
         * @access public
         * @see Net_Other::getUser()
        */


        $userData = $this->getUser($user['user'], 1);
        // Check if the user is in the database
        if (!$userData['error']) {
            // User is in the database
            // Check if the password the user provided matches the one in the database
            if (!password_verify($user['password'], $userData['data']['password'])) {
                // The passwords do not match
                return array("status"=>404, "error"=>true, "message"=>"User not found", "data"=>"");
            }
            else {
                // The passwords match

                // Generate the session tokens
                $selector = bin2hex(random_bytes(8)); // Used to identify the session token in the database
                $token = random_bytes(32); // The session token
                $expires = time() + 60 * 30;

                // Get the user's session data
                $session = $this->getUserSession($userData['data']['email'], 0);
                // Check if the user has an open session
                if (!$session['error']) {
                    // The user has an open session

                    // Delete the current session in the database
                    // Create the query
                    $query = 'DELETE FROM ' . $this->sessionTable . ' WHERE userEmail=?';
                    // Prepare statement
                    $stmt = $this->conn->prepare($query);
                    // Bind the parameter to the placeholder
                    $stmt->bindParam(1, $userData['data']['email']);
                    // Execute teh query
                    $stmt->execute();

                    // Then create a new session data in the database (i.e. login the user)
                    // Create the query
                    $query = 'INSERT INTO ' . $this->sessionTable . ' SET userEmail = :userEmail, sessionSelector = :sessionSelector, sessionToken = :sessionToken, sessionExpires = :sessionExpires';
                    // Prepare statement
                    $stmt = $this->conn->prepare($query);
                    // Bind the parameters to the named place holders
                    $hasedToken = password_hash($token, PASSWORD_DEFAULT);
                    $stmt->bindParam(':userEmail', $userData['data']['email']);
                    $stmt->bindParam(':sessionSelector', $selector);
                    $stmt->bindParam(':sessionToken', $hasedToken);
                    $stmt->bindParam(':sessionExpires', $expires);
                    // Execute the query
                    $stmt->execute();

                    // Set the result
                    $result = array("session_error"=>$session['error'], "username"=>$userData['data']['username'], "email"=>$userData['data']['email'], "token"=>$selector."&".bin2hex($token), "exp"=>$expires);

                    // Return the result
                    return array("status"=>201, "error"=>false, "message"=>"User session created", "data"=>$result); 

                }
                else {
                    // The user does not have an open session

                    // Then create a new session data in the database (i.e. login the user)
                    // Create the query
                    $query = 'INSERT INTO ' . $this->sessionTable . ' SET userEmail = :userEmail, sessionSelector = :sessionSelector, sessionToken = :sessionToken, sessionExpires = :sessionExpires';
                    // Prepare statement
                    $stmt = $this->conn->prepare($query);
                    // Bind the parameters to the named place holders
                    $hasedToken = password_hash($token, PASSWORD_DEFAULT);
                    $stmt->bindParam(':userEmail', $userData['data']['email']);
                    $stmt->bindParam(':sessionSelector', $selector);
                    $stmt->bindParam(':sessionToken', $hasedToken);
                    $stmt->bindParam(':sessionExpires', $expires);
                    // Execute the query
                    $stmt->execute();

                    // Set the result
                    $result = array("username"=>$userData['data']['username'], "email"=>$userData['data']['email'], "token"=>$selector.'&'.bin2hex($token), "exp"=>$expires);

                    // Return the result
                    return array("status"=>201, "error"=>false, "message"=>"User session created", "data"=>$result);
                }

            }
        }
        else {
            // User is not in the database
            return $userData;
        }

    }
}