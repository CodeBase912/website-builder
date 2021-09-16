<?php

require_once '../models/database_config.php';

class Test {
    public function __construct() {
        $database = new Database();
        $db = $database->connect();

        if ($db) {
            echo "Successfully connected to DB <br><br>";
        }
        else {
            echo "Something went wrong <br><br>";
        }

        $query = 'SELECT username, email, verified, mod_timestamp  FROM `members`';
        // Prepare statement
        $stmt = $db->prepare($query);
        // Execute query
        $stmt->execute();
        // Check if there are any results
        if ($stmt->rowCount() > 0) {
            // Get the result
            $result = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                array_push($result, $row);
            }
            print_r(array("status"=>200, "error"=>false, "message"=>"Users Found", "data"=>$result));
        }
        else { 
            // There are no users in the DB
            print_r(array("status"=>404, "error"=>true, "message"=>"No Users Found", "data"=>""));
        }
    }
}

new Test();
exit();

