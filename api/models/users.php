<?php
class User {
    // DB Stuff
    private $conn; // Database connection
    private $table = 'members'; // Database table with user information

    // Post Properties
    public $id; // User's id in the database
    public $username; // User's username
    public $email; // User's email
    public $verified; // Is the user verified: 1=true ; 0=false
    public $modified_at; // Last modified date of the user's account

    // Constructor
    public function __construct($db) {
        $this->conn = $db;
    }

    // Get Users
    public function getUser() {
        // Create the query
        $query = 'SELECT username, email, verified, mod_timestamp FROM ' . $this->table . ' WHERE username=?';

        // Create the prepared statement
        $stmt = $this->conn->prepare($query);
        // Bind the parameter to the placeholder
        $stmt->bindParam(1, $this->username);
        // Execute the query
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Set properties
        $this->username = $row['username'];
        $this->email = $row['email'];
        $this->verified = $row['verified'];
        $this->modified_at = $row['mod_timestamp'];

        return $stmt;
    }

    // Create post
    public function create() {
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
}