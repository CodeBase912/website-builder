<?php
// This file contains the database configuration

set_exception_handler(function ($e) {
 $code = $e->getCode() ?: 400;
 $trace = $e->getTrace();
 header("Content-Type: application/json", false, $code);
 echo json_encode(["error" => $e->getMessage()]);
 exit();
});

class Database {
    // Database Params
    private $host = 'localhost'; // Host name
    private $username = 'root';  // MySQL username
    private $password = '';   // MySQL password
    private $db_name = 'site-builder';  // MySQL database name
    private $conn; // The database connection

    // Database Connect
    public function connect() {
        $this->conn = null;

        try {
            // $this->conn = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name, $this->username, $this->password);
            $this->conn = new PDO('sqlite:../db/app.db', '', '', array(PDO::ATTR_PERSISTENT => true));
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING); 
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $error) {
            // echo 'Connection Error: ' . $error->getMessage();
            // echo json_encode(["status"=>500, "message"=>"Connection Error: ".$error->getMessage()]);
            // echo "<pre>";
            // print_r($error->getTrace());
            // echo "</pre>";
            throw new Exception("Connection Error: ".$error->getMessage()."; On line: ".__LINE__." in ".__FILE__, 500);
        }
        return $this->conn;
    }
}