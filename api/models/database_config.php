<?php
// This file contains the database configuration

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
            $this->conn = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $error) {
            echo 'Connection Error: ' . $error->getMessage(); 
        }
        return $this->conn;
    }
}