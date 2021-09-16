<?php

require_once './database_config.php';

class Test {
    private $conn;

    public function __construct() {
        $database = new Database;
        $this->conn = $database->connect();
        if ($this->conn) {
            echo "Successfully connected to database <br><br>";
        }
        else {
            echo "Something went wrong <br><br>";
        }
    }

    public function getUsers() {
        $query = 'SELECT username, email, verified, mod_timestamp  FROM `members` WHERE username = :username OR email = :email';

        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Bind the parameters to the named placeholders
        $username = 'james';
        $email = 'james@example.com';
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        // Execute query
        $stmt->execute();
        // Check if there are any results
        if ($stmt->rowCount() > 0) {
            // Get the result
            $result = [];
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

    public function setupTable() {
        $query = "CREATE TABLE `members` (
        `id` INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL,
            `username` varchar(65 )UNIQUE NOT NULL DEFAULT '',
            `email` varchar(65) UNIQUE NOT NULL,
            `password` LONGTEXT NOT NULL DEFAULT '', 
            `verified` tinyint(1) NOT NULL DEFAULT '0',
            `mod_timestamp` INTEGER NOT NULL
        )";
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Execute query
        $stmt->execute();

        if ($this->conn) {
            echo "Successfully connected to database <br><br>";
        }
        else {
            echo "Something went wrong <br><br>";
        }

    }
}

$test = new Test();
// $test->setupTable();
var_dump($test->getUsers());
